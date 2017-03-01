function removeNode(target){
    $(target).remove();
}

function getOptionTag(value, label, selected) {
    var optionTag = $(
        "<option/>",{
            "value":value,
            "text":label
        });
    if(value == selected) {
        optionTag.attr('selected','selected');
    }
    return optionTag;
}

function getLabel(target, label) {
    return $(
        "<label/>",{
            "for":target,
            "text":label
        })
}

function getTag(type, attributes) {
    return $(
        type,
        attributes
    )
}