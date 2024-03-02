<script lang="ts">

    import { LOGIN_URL } from "$lib/constants"

    import * as Form from "$lib/components/ui/form"
    import { Input } from "$lib/components/ui/input"
    import { type Infer, superForm, type SuperValidated } from "sveltekit-superforms"
    import { formSchema, type FormSchema } from "./schema"
    import { zodClient } from "sveltekit-superforms/adapters"
    import * as Card from "$lib/components/ui/card"

    export let data: SuperValidated<Infer<FormSchema>>

    const form = superForm(data, {
        validators: zodClient(formSchema),
        dataType: "json",
    })

    const { form: formData, enhance } = form

</script>


<svelte:head>
    <title>Sign-Up | Finances</title>
</svelte:head>


<div class="flex items-center justify-center">

    <Card.Root class="w-[450px]">
        <Card.Header>
            <Card.Title>Create your account</Card.Title>
        </Card.Header>
        <Card.Content>
            <form class="flex flex-col space-y-2" method="POST" use:enhance>

                <Form.Field {form} name="username">
                    <Form.Control let:attrs>
                        <Form.Label>Username</Form.Label>
                        <Input {...attrs} bind:value={$formData.username} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="password">
                    <Form.Control let:attrs>
                        <Form.Label>Password</Form.Label>
                        <Input {...attrs} bind:value={$formData.password} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Button>Create account</Form.Button>
            </form>
        </Card.Content>
        <Card.Footer>
            <a class="btn-text-primary" href={LOGIN_URL}>Already got an account? Login here!</a>
        </Card.Footer>
    </Card.Root>

</div>
