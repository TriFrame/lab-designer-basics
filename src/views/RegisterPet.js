import React from 'react'
import { tether, Area, Avatar, Section, TextInput, Subheading, List, Container, Heading, Button, FileInput, Menu, Redirect } from '@triframe/designer'


export const RegisterPet = tether(function* ({ Api, redirect }) {

    const { Pet, Breed } = Api;

    const form = yield {
        name: '',
        imageUrl: null,
        breed: null
    }

    const breedMenu = yield {
        isShowing: false
    }

    let breeds = yield Breed.list()

    let handleSubmit = async () => {
        await Pet.create({ name: form.name, imageUrl: form.imageUrl, breedId: form.breed.id})
        redirect('/')
    }

    return (
        <Container>
            <Heading>Register Pet</Heading>
            <Section>
                <Subheading>Name</Subheading>
                <TextInput
                    label="Name"
                    value={form.name}
                    onChange={newName => form.name = newName}
                />
            </Section>
            <Section>
                <Subheading>Image</Subheading>
                <Area inline>
                    {form.imageUrl === null && <Avatar.Icon icon="account" />}
                    {form.imageUrl !== null && <Avatar.Image source={form.imageUrl} />}
                    <FileInput
                        value={form.imageUrl}
                        onChange={imageUrl => form.imageUrl = `${Api.url}${imageUrl}`}
                    />
                </Area>
            </Section>
            <Section>
                <Subheading>Breed</Subheading>
                <Area inline>
                    <Menu
                        visible={breedMenu.isShowing}
                        onDismiss={() => breedMenu.isShowing = false}
                        anchor={<Button mode="outlined" onPress={() => breedMenu.isShowing = true}>{form.breed?.name || 'Select'}</Button>} >
                        {breeds.map(breed => (
                            <Menu.Item
                                title={breed.name}
                                onPress={() => {
                                    form.breed = breed
                                    breedMenu.isShowing = false
                                }}
                            />
                        ))}
                    </Menu>
                </Area>
            </Section>
            <Button onPress={handleSubmit}>Register</Button>
        </Container>
    )
})  