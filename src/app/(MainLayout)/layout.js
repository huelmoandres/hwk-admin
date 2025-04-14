'use client'
import Layout from "@/Layout";
import AccountProvider from "@/Helper/AccountContext/AccountProvider";
import CategoryProvider from "@/Helper/CategoryContext/CategoryProvider";
import CartProvider from "@/Helper/CartContext/CartProvider";

export default function RootLayout({ children }) {
  return (
    <AccountProvider>
      <CategoryProvider>
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </CategoryProvider>
    </AccountProvider>
  );
}
