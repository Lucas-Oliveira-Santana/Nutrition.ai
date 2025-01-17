import ThemeSwitcher from "../theme-switcher";

export function Navbar(){
  return(
  <nav className="w-full bg-green-600 dark:bg-green-950 shadow-md">
  <div className="container mx-auto flex justify-between items-center px-6 py-4">
    <a
      href="#"
      className="text-white text-2xl font-medium hover:text-gray-300"
    >
      Nutrition.ai 🍎
    </a>
    <div className="space-x-4 flex items-center">
      {/* <a
        href="#"
        className="text-white text-lg font-medium hover:text-gray-300"
      >
        Menu
      </a> */}
      <a
        href="#"
        className="text-white text-lg font-medium hover:text-gray-300"
      >
        Login
      </a>
      <div className="pl-3">
      <ThemeSwitcher />
      </div>
    </div>
  </div>
</nav>
)
}