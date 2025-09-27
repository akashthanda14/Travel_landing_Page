// app/layout.js
import './globals.css';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        {children}
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 TravelCare. Trusted by working professionals.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
