<script lang="ts">

    import { fade } from "svelte/transition"
    import { Entity, EntityType } from "@prisma/client"

    /**@type {import("./$types").PageData}*/
    export let data

    let dialogVisible = false
    let isEdit = false

    let entityId = -1

    let name: string
    let type: EntityType

    function openDialog(entity?: Entity) {

        if (entity) {
            entityId = entity.id
            name = entity.name
            type = entity.type
            isEdit = true
        } else {
            entityId = -1
            name = ""
            type = EntityType.Entity
            isEdit = false
        }

        dialogVisible = true
    }

</script>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Entities</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" on:click={() => openDialog()} type="button">
            Create Entity
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
                            ID
                        </th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Name</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Type</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Created</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Updated</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col"></th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">

                    {#each data.entities as entity, i}
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{(i +
                                1)}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.name}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.type}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.createdAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.updatedAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <button class="btn-text-primary" on:click={() => openDialog(entity)}>
                                    Edit
                                </button>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <form method="POST" action="?/remove">

                                    <input type="hidden" id="id" name="id" value={entity.id}>

                                    <button type="submit" class="btn-text-primary">
                                        Remove
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

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" transition:fade={{duration: 100}}></div>

    <div class="fixed inset-0 z-10 overflow-y-auto" transition:fade={{duration: 100}}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
                    method="POST" action="{ isEdit ? '?/update' : '?/create'}"
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                <h1 class="text-2xl font-semibold leading-6 text-gray-900 mb-4">{ isEdit
                    ? "Update Entity"
                    : "Create Entity"}</h1>

                <div class="flex flex-col space-y-2">

                    <input type="hidden" name="id" value={entityId}/>

                    <div class="flex flex-row space-x-2">

                        <div class="flex flex-col w-full">
                            <label for="name">Name</label>
                            <input id="name" name="name" class="input-text" bind:value={name} required>
                        </div>

                    </div>

                    <div class="flex flex-row space-x-2">

                        <div class="flex flex-col w-full">
                            <label for="type">Type</label>
                            <select id="type" name="type" bind:value={type}
                                    class="input-text w-full bg-white" required>
                                {#each Object.values(EntityType) as entityType}
                                    <option value={entityType.toString()}>{entityType}</option>
                                {/each}
                            </select>
                        </div>

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
