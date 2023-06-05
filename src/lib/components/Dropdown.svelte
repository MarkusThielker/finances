<script lang="ts">

    export let name: string
    export let label: string
    export let value: number | null
    export let options: any[] = []

    let showOptions = false

    function selectOption(option) {
        value = option
        showOptions = false
    }

</script>

<div class="relative">
    <label class="block" for="{name}-text">{label}</label>
    <div
            class="input-text p-4 cursor-pointer"
            id="{name}-text"
            on:click={() => (showOptions = !showOptions)}
    >
        {value ? value : "Select an option"}
    </div>
    {#if showOptions}
        <div class="absolute z-10 mt-1 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 w-full">
            {#each options as option}
                <div class="p-2 cursor-pointer" on:click={() => selectOption(option)}>{option}</div>
            {/each}
        </div>
    {/if}
    <input bind:value={value} class="hidden" id={name} name={name} type="text"/>
</div>
