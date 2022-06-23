<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { exampleBox } from "../wikitools";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="steuerung" />
    <h1>Steuerung</h1>

    <section id="Bewegung">
      <div use:exampleBox><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo consequatur praesentium reprehenderit dicta! Beatae, doloremque at harum facilis autem pariatur nam nulla? Quisquam voluptate iure voluptatem enim et modi sit animi fugit quis. Nisi laborum, aliquam aspernatur dolor omnis iusto at libero distinctio dolore consequatur blanditiis. Obcaecati quis modi voluptas.</p></div>
      <kbd>CTRL + T</kbd>
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
