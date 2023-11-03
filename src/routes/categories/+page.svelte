<script lang="ts">

    import { fade } from "svelte/transition"
    import { Category } from "@prisma/client"

    /**@type {import("./$types").PageData}*/
    export let data

    let dialogVisible = false
    let isEdit = false

    let categoryId = -1

    let name: string
    let identifier: string
    let color: string
    let colorInput: HTMLInputElement

    function openDialog(category?: Category) {

        if (category) {
            categoryId = category.id
            name = category.name
            color = category.color
            isEdit = true
        } else {
            categoryId = -1
            name = ""
            color = "#" + Math.floor(Math.random() * 16777215).toString(16) // random color code
            isEdit = false
        }

        dialogVisible = true
    }

</script>


<svelte:head>
    <title>Categories | Finances</title>
</svelte:head>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">Categories</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" on:click={() => openDialog()} type="button">
            Create Category
        </button>
    </div>
</div>

<div class="flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" scope="col">
                            Name
                        </th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Color</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Created</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Updated</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">

                    {#each data.categories as category, i}
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">{category.name}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <svg class="h-5" fill={category.color} viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10"/>
                                </svg>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.createdAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.updatedAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 inline-flex space-x-8">

                                <button class="btn-text-primary" on:click={() => openDialog(category)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </button>

                                <form method="POST" action="?/remove">
                                    <input type="hidden" id="id" name="id" value={category.id}>
                                    <button type="submit" class="btn-text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                        </svg>
                                    </button>
                                </form>

                            </td>
                        </tr>
                    {/each}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


{#if dialogVisible}

    <div class="fixed inset-0 bg-gray-500 dark:bg-neutral-900/80 bg-opacity-75 transition-opacity"
         transition:fade={{duration: 100}}></div>

    <div class="fixed inset-0 z-10 overflow-y-auto" transition:fade={{duration: 100}}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form method="POST" action="{ isEdit ? '?/update' : '?/create'}"
                  class="relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl sm:p-6">

                <h1 class="text-2xl font-semibold leading-6 mb-4">{ isEdit
                    ? "Update Category"
                    : "Create Category"}</h1>

                <div class="flex flex-col space-y-2">

                    <input type="hidden" name="id" value={categoryId}/>

                    <div class="flex flex-row space-x-2">

                        <div on:click={() => colorInput.click()}
                             class="shape-rounded aspect-square w-10 cursor-pointer border border-black"
                             style="background-color: {color}">
                        </div>

                        <input id="color"
                               name="color"
                               type="color"
                               class="hidden"
                               bind:value={color}
                               bind:this={colorInput}
                               required>

                        <input id="name" name="name" class="input-text w-full" bind:value={name} required>

                    </div>

                </div>
                <div class="mt-5 sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button type="button"
                            class="btn-text-primary"
                            on:click={() => dialogVisible = !dialogVisible}>Cancel
                    </button>
                    <button type="submit"
                            class="btn-primary"
                            on:click={() => dialogVisible = !dialogVisible}>{ isEdit ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
