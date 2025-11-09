export const metadata = { title: "Novastay", description: "Votre villa, votre paradis" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{margin:0,background:"#0a0a0a",color:"#fff",fontFamily:"Inter,system-ui,Arial"}}>
        {children}
      </body>
    </html>
  );
}
