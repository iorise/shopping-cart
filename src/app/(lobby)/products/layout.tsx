interface ProductsLayoutProps {
    children: React.ReactNode
  }
  
  export default function ProductsLayout({
    children,
  }: ProductsLayoutProps) {
    return (
      <>
        {children}
      </>
    )
  }