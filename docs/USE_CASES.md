# Use Cases

## UC001 - Create Mural
As a user, I want to create a new mural so that I can showcase my posts.

### Preconditions
- User must be logged in.

### Postconditions
- A new mural is created and associated with the user.

### Main Flow
1. User navigates to the "Create Mural" page.
2. User enters a title and description for the mural.
3. User adds posts to the mural.
4. User saves the mural as a draft or publishes it.

### Alternate Flows
- If the user cancels the creation process, the mural is not created.

## UC002 - Edit Mural

As a user, I want to edit existing murals.

### Preconditions
- User must be logged in.
- User must be the owner of the mural.

### Postconditions
- The selected mural is updated with the new information.

### Main Flow
1. User navigates to the "My Murals" page.
2. User selects a mural to edit.
3. User modifies the title, description, or posts within the mural.
4. User saves the changes.

### Alternate Flows
- If the user cancels the editing process, the mural remains unchanged.

## UC003 - Delete Mural

As a user, I want to delete existing murals.

### Preconditions
- User must be logged in.
- User must be the owner of the mural.

### Postconditions
- The selected mural is deleted.

### Main Flow
1. User navigates to the "My Murals" page.
2. User selects a mural to delete.
3. User confirms the deletion.
4. The mural is removed from the user's profile.

### Alternate Flows
- If the user cancels the deletion process, the mural remains unchanged.