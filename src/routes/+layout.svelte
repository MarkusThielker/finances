<script lang="ts">

    import "$lib/styles/app.css"
    import type { LayoutData } from "./$types"
    import { LOGIN_URL, SIGNUP_URL } from "$lib/constants"
    import { page } from "$app/stores"
    import { fade, fly } from "svelte/transition"
    import { browser, version } from "$app/environment"

    export let data: LayoutData

    let isSidebarOpen = false
    let isDarkMode = false

    const menuItems = [
        {
            name: "Dashboard",
            href: "/",
            icon: "" +
                "<svg class=\"h-6 w-6 shrink-0 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" aria-hidden=\"true\">\n" +
                "    <path stroke-linecap=\"round\" stroke-linejoin=\"round\"\n" +
                "          d=\"M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25\"/>\n" +
                "</svg>",
        },
        {
            name: "Payments",
            href: "/payments",
            icon: "" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n" +
                "  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z\" />\n" +
                "</svg>\n",
        },
        {
            name: "Entities",
            href: "/entities",
            icon: "" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n" +
                "  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z\" />\n" +
                "</svg>\n",
        },
        {
            name: "Categories",
            href: "/categories",
            icon: "" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n" +
                "  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z\" />\n" +
                "  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 6h.008v.008H6V6z\" />\n" +
                "</svg>\n",
        },
    ]

    function switchDarkMode() {

        isDarkMode = !isDarkMode
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")

        if (browser) {
            if (isDarkMode) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }
    }

    if (browser) {
        isDarkMode = localStorage.getItem("theme") === "dark"
    }

</script>


<div>

    <!-- Dynamic sidebar for mobile -->
    {#if isSidebarOpen}
        <div class="relative z-50 lg:hidden">

            <div class="fixed inset-0 bg-gray-900/80" transition:fade={{duration: 200}}></div>
            <div class="fixed inset-0 flex" transition:fly={{duration: 200, x: -300}}>

                <div class="relative mr-16 flex w-full max-w-xs flex-1">

                    <div class="absolute left-full flex w-16 justify-center pt-5">
                        <button type="button" class="-m-2.5 p-2.5" on:click={() => isSidebarOpen = !isSidebarOpen}>
                            <span class="sr-only">Close sidebar</span>
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-orange-500 px-6 pb-4">
                        <a href="/" class="flex h-16 shrink-0 items-center" on:click={() => isSidebarOpen = false}>
                            <img class="h-12 w-auto" src="/logo_white.png"
                                 alt="Logo of Markus Thielker: a M and a T between curly braces.">
                        </a>
                        <nav class="flex flex-1 flex-col">
                            <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" class="-mx-2 space-y-1">
                                        {#each menuItems as item}
                                            <li>
                                                <a href={item.href} on:click={() => isSidebarOpen = false}
                                                   class="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold { $page.url.pathname === item.href ? 'bg-orange-600' : 'hover:text-white hover:bg-orange-600' }">
                                                    {@html item.icon}
                                                    {item.name}
                                                </a>
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                                <li class="mt-auto">
                                    <p class="text-orange-300">Version {version}</p>
                                    <div class="row space-x-2">
                                        <a href="/changelog" class="text-orange-300 hover:text-orange-200">Changelog</a>
                                        <a href="https://github.com/markusthielker/finances"
                                           class="text-orange-300 hover:text-orange-200">
                                            Source Code
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-orange-500 px-6 pb-4">
            <a class="flex h-16 shrink-0 items-center" href="/">
                <img alt="Logo of Markus Thielker: a M and a T between curly braces." class="h-12 w-auto"
                     src="/logo_white.png">
            </a>
            <nav class="flex flex-1 flex-col">
                <ul class="flex flex-1 flex-col gap-y-7" role="list">
                    <li>
                        <ul class="-mx-2 space-y-1" role="list">
                            {#each menuItems as item}
                                <li>
                                    <a href={item.href}
                                       class="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold { $page.url.pathname === item.href ? 'bg-orange-600' : 'hover:text-white hover:bg-orange-600' }">
                                        {@html item.icon}
                                        {item.name}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </li>
                    <li class="mt-auto">
                        <p class="text-orange-300">Version {version}</p>
                        <div class="row space-x-2">
                            <a class="text-orange-300 hover:text-orange-200" href="/changelog">Changelog</a>
                            <a class="text-orange-300 hover:text-orange-200"
                               href="https://github.com/markusthielker/finances">
                                Source Code
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- Static top menu bar -->
    <div class="lg:pl-72">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button class="-m-2.5 p-2.5 text-gray-700 lg:hidden" on:click={() => isSidebarOpen = !isSidebarOpen}
                    type="button">
                <span class="sr-only">Open sidebar</span>
                <svg aria-hidden="true" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24">
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </button>

            <!-- Separator -->
            <div aria-hidden="true" class="h-6 w-px bg-gray-900/10 lg:hidden"></div>

            <div class="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
                <div class="flex items-center gap-x-4 lg:gap-x-6">

                    <button aria-checked="false"
                            class="{isDarkMode ? 'bg-orange-600' : 'bg-gray-200'} bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                            on:click={() => switchDarkMode()}
                            type="button"
                    >

                        <span class="sr-only">Enable dark mode</span>

                        <span class="{isDarkMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">

                        <span aria-hidden="true"
                              class="{isDarkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                            <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24">
                                <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"/>
                            </svg>
                        </span>

                        <span aria-hidden="true"
                              class="{isDarkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                            <svg class="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                            </svg>
                        </span>

                      </span>
                    </button>

                    <!-- Separator -->
                    <div aria-hidden="true" class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"></div>

                    <!-- Profile dropdown -->
                    <div class="relative space-x-4">
                        {#if data.user}
                            <a href="/account">Account</a>
                        {:else}
                            <a href={LOGIN_URL} class="btn-text-primary">Login</a>
                            <a href={SIGNUP_URL} class="btn-primary">Create account</a>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 sm:px-6 lg:px-8 space-y-4 py-10">
            <slot/>
        </div>
    </div>
</div>
