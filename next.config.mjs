/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      }
    ]
  },

  // Дополнительные параметры конфигурации:
  // 1. Настройка путей для статических ресурсов
  // 2. Добавление Webpack-плагинов
  // 3. Конфигурация препроцессоров CSS
  // и многое другое...
}

export default nextConfig
