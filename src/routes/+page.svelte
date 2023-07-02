<script lang="ts">

    import { fade, fly } from "svelte/transition"
    import { enhance } from "$app/forms"

    /**@type {import("./$types").PageData}*/
    export let data

    let scopeOptionsVisible = false

</script>

<div class="flex justify-end">
    <div class="relative mt-1 w-48">

        <button type="button" on:click={() => scopeOptionsVisible = !scopeOptionsVisible}
                class="flex cursor-pointer shape-rounded w-full py-1.5 px-4 text-gray-900 border">
            <span class="w-full text-start text-black dark:text-white">{data.scope}</span>
            <span class="flex items-center">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"/>
                </svg>
            </span>
        </button>

        {#if scopeOptionsVisible}

            <div class="absolute w-full z-10 mt-1 py-2 max-h-60 overflow-auto rounded-3xl bg-white dark:bg-neutral-900 border"
                 transition:fade={{duration: 100}}>

                {#each data.scopes as option, i}
                    <form method="POST" action="?/updateScope" use:enhance>

                        <input type="hidden" name="scope" value={option}>

                        <button type="submit" on:click={() => scopeOptionsVisible = false}
                                class="text-gray-900 relative select-none py-2 pl-4 pr-10 cursor-pointer hover:bg-orange-500/25 w-full text-left"
                                in:fly={{duration: 100, delay: i * 45}} out:fade={{duration: 100}}
                        >
                            <span class="text-black dark:text-white">{option}</span>
                            {#if option === data.scope}
                                <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="#FF4500">
                                        <path fill-rule="evenodd"
                                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                              clip-rule="evenodd"/>
                                        </svg>
                                </span>
                            {/if}
                        </button>
                    </form>
                {/each}

            </div>

        {/if}

    </div>
</div>


<div class="flex grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 items-center justify-center">

    <div class="flex card">
        <p class="text-xl">Income: <span>{data.income}</span></p>
    </div>

    <div class="flex card">
        <p class="text-xl">Expanses: <span>{data.expenses}</span></p>
    </div>

    <div class="flex card">
        <p class="text-xl">Development: <span>{data.balanceDevelopment}</span></p>
    </div>

</div>
