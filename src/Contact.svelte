<form id="contact-form">
    <div class="form_category_title">Schreib uns eine E-Mail!</div>

    <div class="form_inputfield form_general">
        <div class="input_desc">
            <p class="input_title">Name</p>
            <p class="input_subline">Vor- und Nachname</p>
        </div>
        <div class="input-container">
            <input name='name' class="smallbutton" placeholder="Vorname">
            <input name='name' class="smallbutton" placeholder="Nachname">
        </div>
    </div>

    <div class="form_inputfield form_general">
        <div class="input_desc">
            <p class="input_title">Betreff</p>
            <p class="input_subline">Kurz fassen</p>
        </div>
        <input name='subject' placeholder="Blablabla..." maxlength="1000">
    </div>

    <div class="form_inputfield form_general">
        <div class="input_desc">
            <p class="input_title">Nachricht</p>
            <p class="input_subline">5 bis 10.000 Zeichen</p>
        </div>
        <textarea name='message' placeholder="Blablabla..." minlength="5" maxlength="10000" class="bigbox"></textarea>
    </div>
</form>