<script lang="ts">

    import { onMount } from "svelte"

    export let name: string
    export let label: string
    export let value: number | null
    export let options: { id: number, name: string }[] = []

    let inputRef: HTMLInputElement
    let inputValue = ""
    let filteredOptions: { id: number, name: string }[] = []
    let showOptions = false

    onMount(() => {
        if (value) {
            const option = options.find(option => option.id === value)
            if (option) { inputValue = option.name }
        }
    })

    function handleInput(event: InputEvent) {

        // display options if input is not empty
        showOptions = inputValue.length > 0

        // filter options
        filteredOptions = options.filter(option =>
            option.name.toLowerCase().includes(inputValue.toLowerCase()),
        )

        // select option if there is only one option left and the user is not deleting chars
        const isDelete = event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward"
        if (filteredOptions.length === 1 && !isDelete) {
            selectOption(filteredOptions[0])
            showOptions = false
            inputRef.blur()
        }
    }

    function selectOption(option: { id: number, name: string }) {
        value = option.id
        inputValue = option.name
        showOptions = false
    }

</script>

<div class="relative">
    <label class="block" for="{name}-text">{label}</label>
    <input
            class="input-text w-full"
            id="{name}-text"
            name="{name}-text"
            placeholder={label}
            type="text"
            bind:this="{inputRef}"
            bind:value="{inputValue}"
            on:input="{handleInput}"
    />
    {#if showOptions}
        <div class="absolute z-10 mt-1 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 w-full">
            {#each filteredOptions as option (option.id)}
                <div class="p-2 cursor-pointer" on:click={() => selectOption(option)}>{option.name}</div>
            {/each}
        </div>
    {/if}
    <input bind:value={value} class="hidden" id={name} name={name} type="number" />
</div>
