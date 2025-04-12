export function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-12">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">THESHOEHOUSE</h3>
          <p className="text-sm text-muted-foreground">
            The ultimate destination for sneaker enthusiasts.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">New Releases</a></li>
            <li><a href="#" className="hover:text-primary">Men</a></li>
            <li><a href="#" className="hover:text-primary">Women</a></li>
            <li><a href="#" className="hover:text-primary">Kids</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Customer Service</a></li>
            <li><a href="#" className="hover:text-primary">Track Order</a></li>
            <li><a href="#" className="hover:text-primary">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-primary">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>123 Sneaker Street</li>
            <li>New York, NY 10001</li>
            <li>info@theshoehouse.com</li>
            <li>(555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} THESHOEHOUSE. All rights reserved.
      </div>
    </footer>
  )
}
