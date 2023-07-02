<script lang="ts">

    const versions = []

</script>

<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">Changelog</h1>
    </div>
</div>

<div class="flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8 space-y-4">

            {#each versions as version}
                <div>
                    <p>
                        <span class="text-2xl font-medium">{version.version}</span>
                        <span class="text-md"> from </span>
                        <span class="text-xl">{version.date.toLocaleDateString()}</span>
                    </p>
                    <ul class="ml-4">
                        {#each version.changes as change}
                            <li> &bullet; {change}</li>
                        {/each}
                    </ul>
                </div>

            {/each}

        </div>
    </div>
</div>
