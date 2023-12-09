<script>
  import Titlebar from "$lib/components/Titlebar.svelte";
  import App from "$lib/components/App.svelte";
  let title = "Visual Studio Code";
  const AppDetails = {
    height: "30rem",
    width: "35rem",
    inset: "1rem",
  };
</script>

<App {...AppDetails}>
  <Titlebar {title} />
  <div class="vscode activeShadow">
    <div class="mainApp">
      <iframe
        title="VS Code"
        src="https://stackblitz.com/github/yashash-pugalia/win11-svelte?embed=1&file=src/App.svelte"
        frameborder="0"
      />
    </div>
  </div>
</App>

<style>
  .vscode {
    background: #202327;
    position: absolute;
    inset: 10%;
    border-radius: 8px;
    overflow: hidden;
    resize: both;
  }
  .mainApp {
    display: flex;
    position: absolute;
    width: 100%;
    height: calc(100% - 36px);
  }

  iframe {
    flex-grow: 1;
  }
</style>
