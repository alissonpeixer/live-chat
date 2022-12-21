export const Container = ({ children }) => {
  return (
    <section
      className="
      mx-auto
      container
      h-screen
      w-screen
      flex
      gap-3
      justify-between
      py-4
    " >
      {children}
    </section>
  )
}
