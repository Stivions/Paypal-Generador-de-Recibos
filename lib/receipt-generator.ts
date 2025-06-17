interface ReceiptData {
  name: string
  email: string
  amount: number
  recipient: string
  currency: string
  lang: string
  transactionType: string
  date?: string
}

export function generateReceiptHTML(data: ReceiptData): string {
  const date = data.date || new Date().toISOString().slice(0, 19).replace("T", " ")
  const transactionId = `PAY-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`

  const currencyData: Record<string, { symbol: string; name: string; format: string }> = {
    EUR: { symbol: "€", name: "EUR", format: "{symbol}{amount} {name}" },
    USD: { symbol: "$", name: "USD", format: "{symbol}{amount} {name}" },
    GBP: { symbol: "£", name: "GBP", format: "{symbol}{amount} {name}" },
    BRL: { symbol: "R$", name: "BRL", format: "{symbol}{amount} {name}" },
    EGP: { symbol: "ج.م", name: "EGP", format: "{amount} {symbol}" },
  }

  const curr = currencyData[data.currency] || currencyData.EUR

  const formatAmount = (amount: number): string => {
    if (data.lang === "ar-eg") {
      return amount.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const amountStr = curr.format
    .replace("{symbol}", curr.symbol)
    .replace("{amount}", formatAmount(data.amount))
    .replace("{name}", curr.name)

  const translations: Record<string, Record<string, string>> = {
    pt: {
      home: "Início",
      send_request: "Enviar e solicitar",
      wallet: "Carteira",
      activity: "Atividade",
      help: "Ajuda",
      notifications: "Notificações",
      settings: "Configurações",
      logout: "TERMINAR SESSÃO",
      sent_to: `Enviou ${amountStr} para ${data.recipient}`,
      subtext: `Informaremos ${data.recipient} de que enviou dinheiro.`,
      feedback: "Feedback sobre esta transação",
      send_more: "Enviar mais dinheiro",
      summary: "Aceder ao Resumo",
      footer_help: "Ajuda",
      footer_contact: "Contacte-nos",
      footer_security: "Segurança",
      copyright: `©1999-${new Date().getFullYear()} PayPal. Todos os direitos reservados.`,
      privacy: "Privacidade",
      cookies: "Cookies",
      legal: "Legal",
      complaints: "Reclamações",
    },
    en: {
      home: "Home",
      send_request: "Send & Request",
      wallet: "Wallet",
      activity: "Activity",
      help: "Help",
      notifications: "Notifications",
      settings: "Settings",
      logout: "LOG OUT",
      sent_to: `You sent ${amountStr} to ${data.recipient}`,
      subtext: `We'll let ${data.recipient} know you sent money.`,
      feedback: "Feedback about this transaction",
      send_more: "Send more money",
      summary: "Go to Summary",
      footer_help: "Help",
      footer_contact: "Contact us",
      footer_security: "Security",
      copyright: `©1999-${new Date().getFullYear()} PayPal. All rights reserved.`,
      privacy: "Privacy",
      cookies: "Cookies",
      legal: "Legal",
      complaints: "Complaints",
    },
    "ar-eg": {
      home: "الرئيسية",
      send_request: "إرسال وطلب",
      wallet: "المحفظة",
      activity: "النشاط",
      help: "مساعدة",
      notifications: "الإشعارات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      sent_to: `لقد أرسلت ${amountStr} إلى ${data.recipient}`,
      subtext: `سنعلم ${data.recipient} أنك أرسلت المال.`,
      feedback: "ملاحظات حول هذه المعاملة",
      send_more: "إرسال المزيد من المال",
      summary: "الانتقال إلى الملخص",
      footer_help: "مساعدة",
      footer_contact: "اتصل بنا",
      footer_security: "الأمان",
      copyright: `©1999-${new Date().getFullYear()} باي بال. جميع الحقوق محفوظة.`,
      privacy: "الخصوصية",
      cookies: "الكوكيز",
      legal: "قانوني",
      complaints: "الشكاوى",
    },
  }

  const t = translations[data.lang] || translations.en
  const rtl = data.lang === "ar-eg" ? ' dir="rtl"' : ""

  return `<!DOCTYPE html>
<html lang="${data.lang}"${rtl}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayPal Receipt</title>
    <style>
        @font-face {
            font-family: 'pp-sans-big-regular';
            src: url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Regular.eot');
            src: url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Regular.eot?#iefix') format('embedded-opentype'),
                 url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Regular.woff2') format('woff2'),
                 url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Regular.svg') format('svg');
        }
        @font-face {
            font-family: 'pp-sans-big-bold';
            src: url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Bold.eot');
            src: url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Bold.eot?#iefix') format('embedded-opentype'),
                 url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Bold.woff') format('woff'),
                 url('https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Bold.svg') format('svg');
        }
        @font-face {
            font-family: 'pp-open-regular';
            src: url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalOpen-Regular.woff2') format('woff2'),
                 url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalOpen-Regular.woff') format('woff');
        }
        body {
            font-family: 'pp-open-regular', Helvetica Neue, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
            color: #001435;
        }
        .navbar {
            background: #1434A4;
            color: #fff;
            padding: 0;
            min-height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .navbar-content {
            width: 100%;
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
        }
        .navbar-left {
            display: flex;
            align-items: center;
        }
        .paypal-logo-navbar {
            background: url('https://www.paypalobjects.com/webstatic/icon/pp258.png') no-repeat center center;
            background-size: 32px 32px;
            width: 32px;
            height: 32px;
            margin-right: 32px;
        }
        .navbar-menu {
            display: flex;
            gap: 16px;
        }
        .navbar-menu a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-size: 1.05rem;
            padding: 10px 18px;
            border-radius: 24px;
            transition: background 0.2s;
        }
        .navbar-menu a.active, .navbar-menu a:hover {
            background: #1e2e8a;
        }
        .navbar-right {
            display: flex;
            align-items: center;
            gap: 18px;
        }
        .navbar-icon {
            width: 22px;
            height: 22px;
            opacity: 0.85;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }
        .navbar-icon svg {
            color: #fff;
            fill: #fff;
        }
        .navbar-user {
            font-size: 1rem;
            margin-left: 8px;
        }
        .main-content {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            background: #fff;
        }
        .confirmation-card {
            margin: 48px 0 32px 0;
            background: #fff;
            border: 1.5px solid #e0e0e0;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(20,52,164,0.03);
            max-width: 520px;
            width: 100%;
            padding: 40px 32px 32px 32px;
            text-align: center;
        }
        .confirmation-title {
            font-family: 'pp-sans-big-bold', Helvetica Neue, Arial, sans-serif;
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 12px;
        }
        .confirmation-subtext {
            font-size: 1.08rem;
            color: #2c2e2f;
            margin-bottom: 12px;
        }
        .confirmation-link {
            color: #1434A4;
            font-weight: 600;
            text-decoration: none;
            font-size: 1.05rem;
            display: block;
            margin-bottom: 8px;
        }
        .confirmation-link:hover {
            text-decoration: underline;
        }
        .main-btn {
            background: #000;
            color: #fff;
            border: none;
            border-radius: 32px;
            padding: 14px 38px;
            font-size: 1.1rem;
            font-family: 'pp-sans-big-bold', Helvetica Neue, Arial, sans-serif;
            font-weight: bold;
            margin: 32px 0 12px 0;
            cursor: pointer;
            transition: background 0.2s;
        }
        .main-btn:hover {
            background: #222;
        }
        .secondary-link {
            color: #1434A4;
            font-size: 1rem;
            text-decoration: none;
            margin-top: 0;
            display: inline-block;
        }
        .secondary-link:hover {
            text-decoration: underline;
        }
        .footer {
            background: #fff;
            border-top: 1.5px solid #f2f2f2;
            margin-top: 64px;
            padding: 0;
        }
        .footer-main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px 16px 0 16px;
            display: flex;
            align-items: center;
            gap: 32px;
        }
        .footer-logo {
            background: url('https://www.paypalobjects.com/webstatic/icon/pp258.png') no-repeat center center;
            background-size: 32px 32px;
            width: 32px;
            height: 32px;
            margin-right: 8px;
            display: inline-block;
        }
        .footer-links {
            display: flex;
            gap: 24px;
            font-size: 1rem;
        }
        .footer-links a {
            color: #001435;
            text-decoration: none;
            font-weight: 500;
        }
        .footer-links a:hover {
            text-decoration: underline;
        }
        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px;
            font-size: 0.95rem;
            color: #6c7378;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        .footer-bottom-links {
            display: flex;
            gap: 18px;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-content">
            <div class="navbar-left">
                <div class="paypal-logo-navbar"></div>
                <div class="navbar-menu">
                    <a href="#">${t.home}</a>
                    <a href="#" class="active">${t.send_request}</a>
                    <a href="#">${t.wallet}</a>
                    <a href="#">${t.activity}</a>
                    <a href="#">${t.help}</a>
                </div>
            </div>
            <div class="navbar-right">
                <a href="#" id="header-notifications" class="navbar-icon" title="${t.notifications}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path d="M19.25 16.37h-.05a.2.2 0 0 1-.2-.2v-5.55c0-3.17-2.11-5.85-5.01-6.71A2 2 0 0 0 12 2a2 2 0 0 0-1.99 1.91C7.11 4.77 5 7.45 5 10.62v5.55a.2.2 0 0 1-.2.2h-.05a.749.749 0 1 0 0 1.5h14.5a.749.749 0 1 0 0-1.5zm-4.9 3.15h-4.7c-.23 0-.37.25-.26.45A2.98 2.98 0 0 0 12 21.52c1.13 0 2.11-.63 2.61-1.55.11-.21-.03-.45-.26-.45z"></path>
                    </svg>
                </a>
                <a href="#" class="navbar-icon" title="${t.settings}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path d="M19.722 10.2a.378.378 0 0 1-.369-.279 7.39 7.39 0 0 0-.684-1.647.378.378 0 0 1 .054-.45 1.271 1.271 0 0 0 0-1.809l-.729-.729a1.271 1.271 0 0 0-1.809 0 .367.367 0 0 1-.45.054 7.642 7.642 0 0 0-1.656-.684.394.394 0 0 1-.279-.369C13.8 3.576 13.224 3 12.513 3h-1.035c-.702 0-1.278.576-1.278 1.287a.375.375 0 0 1-.279.36 7.642 7.642 0 0 0-1.656.684.378.378 0 0 1-.45-.054 1.271 1.271 0 0 0-1.809 0l-.738.729a1.271 1.271 0 0 0 0 1.809.367.367 0 0 1 .054.45 8.305 8.305 0 0 0-.675 1.656.375.375 0 0 1-.36.279h-.009C3.576 10.2 3 10.776 3 11.478v1.044c0 .711.576 1.278 1.278 1.278h.009c.171 0 .315.117.36.279a7.39 7.39 0 0 0 .684 1.647.378.378 0 0 1-.054.45 1.271 1.271 0 0 0 0 1.809l.729.729a1.271 1.271 0 0 0 1.809 0 .367.367 0 0 1 .45-.054 7.57 7.57 0 0 0 1.647.684.392.392 0 0 1 .288.369v.009c0 .702.567 1.278 1.278 1.278h1.044c.702 0 1.278-.576 1.278-1.278 0-.171.117-.315.279-.36a7.39 7.39 0 0 0 1.647-.684.378.378 0 0 1 .45.054 1.271 1.271 0 0 0 1.809 0l.729-.729a1.271 1.271 0 0 0 0-1.809.367.367 0 0 1-.054-.45 7.57 7.57 0 0 0 .684-1.647.375.375 0 0 1 .36-.279h.009c.702 0 1.278-.576 1.278-1.278v-1.062a1.27 1.27 0 0 0-1.269-1.278zM12 15.15A3.153 3.153 0 0 1 8.85 12 3.153 3.153 0 0 1 12 8.85 3.153 3.153 0 0 1 15.15 12 3.153 3.153 0 0 1 12 15.15z"></path>
                    </svg>
                </a>
                <span class="navbar-user">${t.logout}</span>
            </div>
        </div>
    </nav>
    <main class="main-content">
        <div class="confirmation-card">
            <div class="confirmation-title">${t.sent_to}</div>
            <div class="confirmation-subtext">${t.subtext}</div>
            <a class="confirmation-link" href="#">${t.feedback}</a>
        </div>
        <button class="main-btn">${t.send_more}</button>
        <br>
        <a class="secondary-link" href="#">${t.summary}</a>
    </main>
    <footer class="footer">
        <div class="footer-main">
            <span class="footer-logo"></span>
            <div class="footer-links">
                <a href="#">${t.footer_help}</a>
                <a href="#">${t.footer_contact}</a>
                <a href="#">${t.footer_security}</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>${t.copyright}</span>
            <div class="footer-bottom-links">
                <a href="#">${t.privacy}</a>
                <a href="#">${t.cookies}</a>
                <a href="#">${t.legal}</a>
                <a href="#">${t.complaints}</a>
            </div>
        </div>
    </footer>
</body>
</html>`
}
