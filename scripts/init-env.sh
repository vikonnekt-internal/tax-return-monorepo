pnpm install
cd packages/database && docker-compose up -d
cd ../..
pnpm run prepare:db