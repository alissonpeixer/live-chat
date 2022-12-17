export const Container = ({ children }) => {
  return (
    <section className="mx-auto  bg-zinc-700 min-h-screen w-screen flex flex-col
    justify-between" >
      {children}
    </section>
  )
}
