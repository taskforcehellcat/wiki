<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { themeId } from './stores';
	let themeButton;
	let themePicker;
	let themesOpen = false;

	let theme;

	themeId.subscribe((value) => {
		if (browser) return (theme = localStorage.theme = value);
	});

	let useSysTheme = false;

	onMount(async () => {
		let theme;

		console.log(theme);
		if (theme === null) {
			themePickerUsed('auto');
			console.log('penis');
		}
		console.log(theme);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (useSysTheme) {
				theme = e.matches ? 'dark' : 'light';
				setColorScheme(theme);
			}
		});
	});

	function toggleThemeMenu() {
		if (themesOpen) {
			themesOpen = false;
			themePicker.style.display = 'none';
			themeButton.style.borderBottomRightRadius = '1.5rem';
			themeButton.style.borderBottomLeftRadius = '1.5rem';
		} else {
			themesOpen = true;
			themePicker.style.display = 'flex';
			themeButton.style.borderBottomRightRadius = '0';
			themeButton.style.borderBottomLeftRadius = '0';
		}
	}

	function setColorScheme(setheme) {
		if (setheme === 'light') {
			document.body.dataset.theme = 'light';
		} else if (setheme === 'dark') {
			document.body.dataset.theme = 'dark';
		}
	}

	function themePickerUsed(whichOne: string) {
		if (whichOne === 'auto') {
			useSysTheme = true;
			themeId.set('');
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			setColorScheme(theme);
		} else {
			useSysTheme = false;
			themeId.set(whichOne);
			setColorScheme(whichOne);
		}
	}
</script>

<div id="theme">
	<button id="theme__button" on:click={toggleThemeMenu} bind:this={themeButton}
		><span class="material-icons">format_paint</span></button
	>
	<div id="theme__picker" bind:this={themePicker}>
		<input
			type="radio"
			id="theme_light"
			name="theme"
			value={'light'}
			bind:group={theme}
			on:click={() => themePickerUsed('light')}
			on:click={toggleThemeMenu}
		/>
		<label for="theme_light" />
		<input
			type="radio"
			id="theme_dark"
			name="theme"
			value={'dark'}
			bind:group={theme}
			on:click={() => themePickerUsed('dark')}
			on:click={toggleThemeMenu}
		/>
		<label for="theme_dark" />
		<input
			type="radio"
			id="theme_auto"
			name="theme"
			value={'auto'}
			bind:group={theme}
			on:click={() => themePickerUsed('auto')}
			on:click={toggleThemeMenu}
		/>
		<label for="theme_auto">AUTO</label>
	</div>
</div>

<style>
	#theme {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 10;
	}
	#theme__button {
		width: 6rem;
		height: 6rem;
		border: none;
		cursor: pointer;
		border-top-right-radius: 1.5rem;
		border-top-left-radius: 1.5rem;
		border-bottom-right-radius: 1.5rem;
		border-bottom-left-radius: 1.5rem;
		background-color: var(--brandSecondaryBG);
	}

	#theme__picker {
		width: 6rem;
		height: fit-content;
		border-bottom-left-radius: 1.5rem;
		border-bottom-right-radius: 1.5rem;
		background-color: rgb(172, 172, 172);
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		display: none;
		padding-block: 2rem;
	}

	#theme__picker input {
		display: none;
	}

	#theme__picker label {
		width: 4.5rem;
		height: 4.5rem;
		background: #101b3b;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}

	#theme__picker label[for='theme_light'] {
		background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
	}

	#theme__picker label[for='theme_dark'] {
		background: linear-gradient(-45deg, #0a0a0a 50%, #1b1b1b 5%);
	}
</style>
