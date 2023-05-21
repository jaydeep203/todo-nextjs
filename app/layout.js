import "../styles/app.scss";
import Header from "./header";
import { ContextProvider } from "@/components/Clients";

export const metadata = {
  title: 'Todo app',
  description: 'This is a TodoApp project made in Next.js',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
        
        </body>
    </html>
  )
}
