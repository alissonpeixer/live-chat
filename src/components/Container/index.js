export const Container = ({ children }) => {
  return (
    <section className="mx-auto container h-screen w-screen flex xl:flex-row flex-col xl:gap-4 xl:p-5 overflow-hidden">
      {children}
    </section>
  )
}
