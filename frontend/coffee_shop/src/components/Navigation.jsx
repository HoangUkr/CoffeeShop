import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/* Import Headless UI */
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAdmin } from "../hooks/useAdmin";

// Navigation items
const navigation = [
  // Need to fix the href
  { name: "Home", href: "", current: true },
  // { name: "About", href: "#", current: false },
  // { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  // Navigation hook
  const navigate = useNavigate();

  // Admin authentication hook
  const { isAuthenticated, user, logout, loadingStates } = useAdmin();

  // State of menu dropdown
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Disclosure>
      {({ open }) => (
        <div className="overflow-x-hidden max-w-screen">
          <nav
            className={classNames(
              "fixed top-0 z-50 bg-[#4B2E2E] text-white shadow-md transition-all duration-300 w-full"
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                {/* Left: Logo + Navigation */}
                <div className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="text-xl font-bold hover:text-yellow-300"
                  >
                    Sweet Coffee
                  </Link>
                  <div className="hidden sm:flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-yellow-300"
                            : "hover:text-yellow-300",
                          "px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Menu Dropdown */}
                    <div className="hidden sm:block">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-medium hover:text-yellow-300">
                          <span>Menu</span>
                          <ChevronDownIcon
                            className="ml-1 h-4 w-4 text-white"
                            aria-hidden="true"
                          ></ChevronDownIcon>
                        </Menu.Button>
                        <Menu.Items className="absolute mt-2 w-40 origin-top-left rounded-md bg-[#4B2E2E] shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-[#3E2626]" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Coffee
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-[#3E2626]" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Cake
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                </div>

                {/* Right: Cart + Profile */}
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="rounded-full p-2 bg-[#4B2E2E] hover:bg-[#3E2626] focus:ring-2 focus:ring-white focus:outline-none"
                    onClick={() => {
                      // Handle cart click
                      navigate("/cart");
                    }}
                  >
                    <ShoppingCartIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <Menu as="div" className="relative">
                    <Menu.Button className="flex rounded-full bg-[#4B2E2E] p-1 focus:outline-none focus:ring-2 focus:ring-white">
                      <UserCircleIcon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      ></UserCircleIcon>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-[#4B2E2E] shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {isAuthenticated ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <div className="px-4 py-2 text-sm text-yellow-300 border-b border-[#3E2626]">
                                Welcome, {user?.email}
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin/dashboard"
                                className={classNames(
                                  active ? "bg-[#3E2626]" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Admin Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                disabled={loadingStates.logout}
                                className={classNames(
                                  active ? "bg-[#3E2626]" : "",
                                  "block w-full text-left px-4 py-2 text-sm text-white disabled:opacity-50"
                                )}
                              >
                                {loadingStates.logout ? "Logging out..." : "Log out"}
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-[#3E2626]" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Admin Login
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Menu>

                  {/* Mobile menu button */}
                  <div className="sm:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[#3E2626] focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Panel */}
            <Disclosure.Panel className="sm:hidden bg-[#4B2E2E] text-white">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {/* Navigation items */}
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium hover:text-yellow-300"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {/* Collapsible submenu */}
                <Disclosure as="div" className="px-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center rounded-md px-3 py-2 text-base font-medium hover:text-yellow-300">
                        <span>Menu</span>
                        <svg
                          className={`h-5 w-5 transform transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-1 space-y-1">
                        <a
                          href="#"
                          className="block rounded-md px-5 py-2 text-sm text-white hover:text-yellow-300"
                        >
                          Coffee
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-5 py-2 text-sm text-white hover:text-yellow-300"
                        >
                          Cake
                        </a>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </Disclosure.Panel>
          </nav>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
