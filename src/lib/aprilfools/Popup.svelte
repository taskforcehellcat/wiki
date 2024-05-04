<!-- april fools "TFHC Wiki Plus+" Popup -->
<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let popupIsOpen = false;

  const togglePopup = () => (popupIsOpen = !popupIsOpen);

  onMount(async () => {
    const date = new Date();
    if (date.getMonth() === 3 && date.getDate() === 1) {
      togglePopup();
    }
  });
</script>

{#if popupIsOpen}
  <div id="popup">
    <div class="popup-box" transition:slide|local>
      <div id="popup__header">
        <div id="popup__close" on:click={togglePopup} on:keydown={togglePopup}>
          <span class="material-icons-round">close</span>
        </div>
      </div>
      <div id="popup__content" class="fancy-scrollbar">
        <h1>
          Um diesen Artikel zu lesen, musst du TFHC Wiki Plus+ Mitglied sein!
        </h1>
        <p>
          Mit unserem neuen Abonnement-Service kannst du dir alle Artikel des
          TFHC Wikis ansehen. Klicke auf die Schaltfläche unten, um das
          Abonnement abzuschließen!
        </p>

        <div id="price">
          <div class="price__container">
            <div class="price__box">
              <div class="price__box__header">
                <h2>TFHC Wiki Plus+</h2>
              </div>
              <div class="price__box__content">
                <div class="price__box__content__price">
                  <h1>9,99€ <span class="sub-text">pro Monat</span></h1>
                </div>
                <div class="price__box__content__features">
                  <ul>
                    <li>Alle Artikel lesen</li>
                    <li>Kostenlose Updates</li>
                  </ul>
                </div>
              </div>
              <div class="popup__buttons">
                <button class="popup__button" on:click={togglePopup}
                  >Jetzt abonnieren!</button
                >
              </div>
            </div>
          </div>

          <div class="price__container">
            <div class="price__box">
              <div class="price__box__header">
                <h2>TFHC Wiki Plus+ PRO</h2>
              </div>
              <div class="price__box__content">
                <div class="price__box__content__price">
                  <h1>19,99€ <span class="sub-text">pro Monat</span></h1>
                </div>
                <div class="price__box__content__features">
                  <ul>
                    <li>Alle Artikel lesen</li>
                    <li>Kostenlose Updates</li>
                    <li>Keine Werbung</li>
                    <li>Keine Begrenzungen</li>
                    <li>Keine Popups</li>
                    <li>"Wiki Plus+ PRO"-Rang in Discord</li>
                  </ul>
                </div>
              </div>
              <div class="popup__buttons">
                <button class="popup__button" on:click={togglePopup}
                  >Jetzt abonnieren!</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .fancy-scrollbar {
    // firefox
    scrollbar-width: thin;
    scrollbar-color: #e0e0e0 #fff;

    // chrome
    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background: hsla(0, 0%, 100%, 0);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
      border-radius: 1rem;
      border: 3px solid #fff;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #d0d0d0;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: #c0c0c0;
    }
  }

  #popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    --popupBG: #fff;
    overflow-y: hidden;

    > .popup-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(90%, 80rem);
      max-height: 90%;
      background-color: var(--popupBG);
      border-radius: 0.5rem;
      border: 1px solid var(--popupBorder);
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      gap: 4rem;

      > #popup__header {
        padding: 1rem;
        position: absolute;
        right: 0;

        > #popup__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: var(--popupCloseBG);
          border: 1px solid var(--popupCloseBorder);
          cursor: pointer;

          &:hover {
            background-color: var(--popupCloseBGHover);
          }

          > .material-icons-round {
            font-size: 20pt;
            margin-right: -4px;
          }
        }
      }

      > #popup__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem;
        padding-inline: 5rem;
        padding-bottom: 5rem;
        overflow-y: overlay;
        padding-top: 5rem;

        #price {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          gap: 2rem;

          > .price__container {
            display: flex;
            justify-content: center;
            gap: 2rem;
            width: min(30rem, 100%);

            > .price__box {
              width: min(30rem, 100%);
              padding-top: 2rem;
              height: 100%;
              border-radius: 0.5rem;
              border: 1px solid #e0e0e0;
              display: flex;
              flex-direction: column;
              gap: 1rem;

              > .price__box__header {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 4rem;
                border-radius: 0.5rem 0.5rem 0 0;
              }

              > .price__box__content {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                height: 100%;
                padding-inline: 1rem;

                > .price__box__content__price {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 0.5rem;

                  > h1 {
                    font-size: 2rem;
                    font-weight: 500;
                  }
                }

                > .price__box__content__features {
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;

                  > ul {
                    margin-top: 1.5rem;
                    list-style-type: '—   ';
                    margin-left: 1.5rem;
                    padding-inline-start: 1rem;
                    font-size: 1.5rem;
                    font-weight: 400;
                  }
                }
              }

              > .popup__buttons {
                display: flex;

                > .popup__button {
                  width: 100%;
                  height: 4rem;
                  border-radius: 0.5rem;
                  background-color: #157347;
                  color: #fff;
                  border: 1px solid #146c43;
                  cursor: pointer;
                  margin: 1rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  &:hover {
                    background-color: #12613c;
                  }
                }
              }
            }
          }
        }

        > h1 {
          font-size: 3rem;
        }

        h2 {
          margin: unset;
        }

        .sub-text {
          font-size: 1.5rem;
          color: rgb(66, 66, 66);
          font-weight: 500;
        }
      }
    }
  }
</style>
