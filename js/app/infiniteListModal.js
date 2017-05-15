function openInfiniteListModal(modalItemType, modalItemId) {

    switch(modalItemType) {
        case 'contact':
            buildContactModal(modalItemId);
            break;
        case 'proprietor':
            buildProprietorModal(modalItemId);
            break;
        case 'job-archived':
            getJobData(modalItemId);
            break;
        default:
            break;
    }

}