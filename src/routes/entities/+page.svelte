<script lang="ts">

    /**@type {import("./$types").PageData}*/
    export let data

</script>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Entities</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" type="button">
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
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Identifier
                        </th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Type</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Created</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Updated</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">

                    {#each data.entities as entity, i}
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{(i +
                                1)}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.name}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.identifier}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.type}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.createdAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entity.updatedAt.toLocaleString()}</td>
                        </tr>
                    {/each}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
