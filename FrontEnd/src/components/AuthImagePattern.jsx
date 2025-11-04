// eslint-disable-next-line react/prop-types
const AuthImagePattern = ({ title, subtitle }) => {
  const array = new Array(9).fill(0);

  return (
    <div className="hidden lg:flex items-center justify-center mt-8 bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {array.map((box, idx) => (
            <div key={idx} className={`aspect-square bg-primary rounded-2xl ${idx % 2 == 0?"animate-pulse":""}`}></div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern