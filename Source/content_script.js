walk(document.body);

function walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            if (node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
            break;
    }
}

function handleText(textNode) {

    substitutions = {
        "cloud": "butt",
        "witnesses": "dudes I know",
        "allegedly": "kinda probably",
        "new study": "tumblr post",
        "rebuild": "avenge",
        "space": "spaaace",
        "google glass": "virtual boy",
        "smartphone": "pokédex",
        "electric": "atomic",
        "senator": "Elf Lord",
        "car": "cat",
        "election": "eating contest",
        "congressional leaders": "river spirits",
        "homeland security": "homestar runner",
        "could not be reached for comment": "is guilty and everyone knows it"
    }

    var v = textNode.nodeValue;
    for (key in substitutions) {
        var first_letter = key.charAt(0);
        var rest = key.substring(1);

        v = v.replace(new RegExp('\\b(' + first_letter.toUpperCase() + '|' + first_letter.toLowerCase() + ')' + rest, 'g'), function (match, p1, p2, offset, string) {
            var substitution;
            if (p1.charAt(0) == p1.charAt(0).toUpperCase()) {
                //First letter was uppercase
                substitution = substitutions[key].charAt(0).toUpperCase();
            } else {
                substitution = substitutions[key].charAt(0).toLowerCase();
            }

            substitution += substitutions[key].substring(1);

            return substitution;
        });
    }

    textNode.nodeValue = v;
}

