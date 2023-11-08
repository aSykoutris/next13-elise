import { Code } from "@nextui-org/react";

export function BodyEN1() {
  return (
    <p className="py-2">
      When you have no internet connectivity from your invoicing machine, use
      any sort of device (smartphone, tablet, laptop) with cellular connectivity
      and send an email to the following address
    </p>
  );
}

export function BodyEN2() {
  return (
    <section className="py-2">
      <p>
        You can validate a european VAT number by following the JSON example
        below:
      </p>
      <Code className="whitespace-pre">{`{\n"Code": "EL",\n"Vat": "998963881"\n}`}</Code>
    </section>
  );
}

export function BodyEN3() {
  return (
    <section className="py-2">
      <p>
        You can validate a Greek VAT number by following the JSON example below:
      </p>
      <Code className="whitespace-pre">{`{\n"UserName": "example@softone.gr",\n"Password": "123456 ",\n"CalledBy": "979863780",\n"CalledFor": "245678904"\n}`}</Code>
    </section>
  );
}

export function BodyEL1() {
  return (
    <section className="py-2">
      <p className="pb-3">
        Στην περίπτωση που χάσετε τη σύνδεση στο διαδίκτυο, παρακαλώ ακολουθήστε
        τα παρακάτω βήματα:
      </p>
      <ol className="list-decimal">
        <li>
          Συνεχίζετε τιμολόγηση κανονικά (είτε χειρόγραφα, είτε μηχανογραφικά αν
          το επιτρέπει το πρόγραμμα σας)
        </li>
        <li>Σημειώνετε τα τιμολόγια που εκδίδετε - σειρά και αριθμό.</li>
        <li>
          Χρησιμοποιήστε οποιαδήποτε συσκευή με δεδομένα κινητής τηλεφωνίας
          (τηλέφωνο, τάμπλετ, λάπτοπ) για να αποστείλετε email στην παρακάτω
          διεύθυνση: Το email σας θα πρέπει να περιλαμβάνει ως Subject Line το
          ΑΦΜ της εταιρείας σας, μαζί με το πρόθεμα χώρας (πχ EL111222333), και
          σαν κείμενο να έχει τα παραστατικά (σειρά κενό αριθμός) που σημειώσατε
          προηγουμένως, διαχωρισμένα με κόμματα.
        </li>
      </ol>
      <div className="font-bold underline">Παράδειγμα:</div>
      <div>
        <span className="font-bold">Subject:</span> EL111222333
      </div>
      <div>
        <span className="font-bold">Body:</span> ΤΠΥ 3456, ΤΠΥ 3457
      </div>
    </section>
  );
}
