define('autocrm:my-action-handler', ['action-handler'], (Dep) => {

    return class extends Dep {
 
         initTest() {}
        
         async test(data, e) {
            try {
                const leadResponse = await Espo.Ajax.getRequest('Lead/' + this.view.model.id);
                const leadEmail = leadResponse.emailAddress;
                console.log("Kontakty s email adresou: " + leadEmail);

                const contactResponse = await Espo.Ajax.getRequest('Contact');
                const contactEmails = contactResponse.list.map(item => item.emailAddress.toString());
                const contactFirstNames = contactResponse.list.map(item => item.firstName.toString());
                const contactLastNames = contactResponse.list.map(item => item.lastName.toString());

                for (let i = 0; i < contactResponse.total; i++) {
                    if (contactEmails[i] === leadEmail) {
                        console.log(contactFirstNames[i]  + " " + contactLastNames[i]);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
         }       
 
         isTestVisible() {
             return !['Converted', 'Dead', 'Recycled'].includes(this.view.model.get('status'));
         }
     }
 });