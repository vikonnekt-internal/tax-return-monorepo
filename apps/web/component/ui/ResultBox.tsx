const ResultBox = ({ label, result }: { label: string; result: string }) => {
  return (
    <div className="bg-sky-50 rounded-lg flex flex-col items-center py-2 my-4 px-12">
      <div className="text-center justify-start text-slate-900 text-2xl font-light  leading-loose">
        {label}
        <div className="justify-start text-slate-900 text-5xl font-bold leading-[57.60px]">
          {result}
        </div>
      </div>
    </div>
  )
}
export default ResultBox
