<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <slot name="thead">
            <th>Nom</th>
            <th>Entreprise</th>
            <th class="text-end">Date d'ajout</th>
            <th class="text-end">Actions</th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
