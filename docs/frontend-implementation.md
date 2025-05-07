# Frontend Implementation

This document provides details about the frontend implementation of the Tax ID Return System, including the technologies used, architecture, and key components.

## Technologies

The frontend is built with:

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Apollo Client**: GraphQL client for state management and data fetching
- **TypeScript**: Typed superset of JavaScript

## Application Structure

The frontend follows Next.js's app router structure, organized in a feature-based pattern:

```
app/
├── api/                # Client-side API endpoints
├── auth/               # Authentication pages
│   ├── signin/         # Sign-in page
│   ├── signup/         # Sign-up page
│   └── reset-password/ # Password reset page
├── information/        # Informational pages
├── tax/                # Tax-related pages
│   ├── return/         # Tax return pages
│   ├── income/         # Income management pages
│   ├── assets/         # Asset management pages
│   └── debts/          # Debt management pages
├── layout.tsx          # Root layout component
└── page.tsx            # Home page component
```

## Component Organization

The frontend components are organized in a hierarchical structure:

```
component/
├── ui/                 # UI components
│   ├── button/         # Button components
│   ├── form/           # Form-related components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   └── data-display/   # Data display components
└── feature/            # Feature-specific components
    ├── auth/           # Authentication components
    ├── taxpayer/       # Taxpayer-related components
    ├── tax-return/     # Tax return components
    ├── income/         # Income-related components
    ├── assets/         # Asset-related components
    └── debts/          # Debt-related components
```

## State Management

The frontend uses several state management approaches:

- **Apollo Client**: For GraphQL data fetching and caching
- **React Context**: For sharing state across components
- **React Query**: For REST API data fetching (where applicable)
- **Local Component State**: For component-specific state

## Routing

The application uses Next.js's app router for routing:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
```

## Authentication

Authentication is implemented using JWT (JSON Web Token):

1. User logs in via the `/auth/login` page
2. JWT token is stored in local storage or cookies
3. Apollo Client includes the token in GraphQL requests via HTTP headers
4. Protected routes check authentication status

```tsx
// Example authentication provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token and fetch user info
      client
        .query({
          query: ME_QUERY,
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        })
        .then(({ data }) => {
          setUser(data.me);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Implementation details...
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Form Management

Forms are managed using:

- **React Hook Form**: For form state management
- **Zod**: For form validation
- **Custom form components**: For consistent UI

```tsx
// Example form component
const TaxpayerForm = ({ onSubmit, initialData }: TaxpayerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxpayerFormValues>({
    resolver: zodResolver(taxpayerSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="First Name" error={errors.firstName?.message}>
          <input type="text" {...register("firstName")} className="input" />
        </FormField>

        {/* Additional form fields */}

        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
```

## Data Fetching

Data is fetched using Apollo Client for GraphQL queries:

```tsx
// Example data fetching component
const TaxReturnPage = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useQuery(TAX_RETURN_QUERY, {
    variables: { id: parseInt(params.id) },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const { taxReturn } = data;

  return (
    <div>
      <h1>Tax Return #{taxReturn.id}</h1>
      <TaxReturnDetails taxReturn={taxReturn} />
    </div>
  );
};
```

## Error Handling

The application uses a comprehensive error handling approach:

- **Network errors**: Handled by Apollo Client
- **GraphQL errors**: Parsed and displayed to the user
- **Form validation errors**: Displayed inline with form fields
- **Global error boundary**: Catches unhandled errors

```tsx
// Example error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Responsive Design

The application uses Tailwind CSS for responsive design:

- Mobile-first approach
- Responsive breakpoints for different screen sizes
- Flexible layouts using Flexbox and Grid

```tsx
// Example responsive component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <aside className="md:col-span-3 lg:col-span-2">
        <Sidebar />
      </aside>
      <main className="md:col-span-9 lg:col-span-10">{children}</main>
    </div>
  );
};
```

## Accessibility

The application follows accessibility best practices:

- Semantic HTML
- ARIA attributes where necessary
- Keyboard navigation
- Color contrast compliance
- Screen reader support

```tsx
// Example accessible component
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="modal-overlay"
    >
      <div className="modal">
        <header>
          <h2 id="modal-title">{title}</h2>
          <button aria-label="Close" onClick={onClose} className="close-button">
            ×
          </button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null;
};
```

## Performance Optimization

The application uses several techniques for performance optimization:

- **Code splitting**: Using Next.js's automatic code splitting
- **Image optimization**: Using Next.js's Image component
- **Lazy loading**: For components and routes
- **Memoization**: Using React.memo and useMemo
- **Virtualization**: For long lists
- **Apollo Cache**: For efficient data management

```tsx
// Example optimized list component
const TaxpayerList = ({ taxpayers }: { taxpayers: Taxpayer[] }) => {
  return (
    <div>
      {taxpayers.map((taxpayer) => (
        <TaxpayerListItem key={taxpayer.id} taxpayer={taxpayer} />
      ))}
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
const TaxpayerListItem = React.memo(({ taxpayer }: { taxpayer: Taxpayer }) => {
  return (
    <div className="taxpayer-list-item">
      <h3>
        {taxpayer.firstName} {taxpayer.lastName}
      </h3>
      <p>{taxpayer.id}</p>
    </div>
  );
});
```

## Icons and Assets

The application uses:

- **Custom SVG icons**: For consistent design
- **Next.js public directory**: For static assets
- **Optimized images**: Using Next.js Image component

## Internationalization

The application supports multiple languages through:

- **i18n library**: For translation
- **Date formatting**: Using Intl API
- **Number formatting**: Using Intl API

## Testing

The frontend is tested using:

- **Jest**: For unit tests
- **React Testing Library**: For component tests
- **Cypress**: For end-to-end tests
