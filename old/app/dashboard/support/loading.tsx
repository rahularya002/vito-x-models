export default function SupportLoading() {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-800 rounded w-1/4 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="h-64 bg-stone-800 rounded-xl"></div>
              </div>
              
              <div className="md:col-span-3">
                <div className="h-96 bg-stone-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  