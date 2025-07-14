// Task 4 - Part 1 - 🏥 Hospital Management System
// Step 1
class User {
    #email;
    #userId;

    constructor(name, email, userId) {
        this.name = name;
        this.#email = email;
        this.#userId = userId;
    }

    getEmail() {
        return this.#email;
    }

    setEmail(newEmail) {
        if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
            this.#email = newEmail;
        } else {
            console.log("Invalid email format. Email not updated.");
        }
    }

    getId() {
        return this.#userId;
    }

    setId(newId) {
        if (newId) {
            this.#userId = newId;
        } else {
            console.log("User ID cannot be empty. ID not updated.");
        }
    }

    performAction() {
        throw new Error("This method should be overridden by subclasses.");
    }
}

if (typeof window !== 'undefined') {
    console.log("--- Demonstrating User Base Class (JavaScript) ---");

    const user1 = new User("Alice Smith", "alice.smith@example.com", "USR001");
    console.log(`Initial User: ${user1.name}, Email: ${user1.getEmail()}, ID: ${user1.getId()}`);

    user1.setEmail("alice.smith.new@example.com");
    console.log(`Updated Email: ${user1.getEmail()}`);

    user1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${user1.getEmail()}`);

    user1.setId("USR001_NEW");
    console.log(`Updated ID: ${user1.getId()}`);

    user1.setId("");
    console.log(`ID after empty attempt: ${user1.getId()}`);

    try {
        user1.performAction();
    } catch (e) {
        console.log(`Expected error for performAction: ${e.message}`);
    }

    console.log("\n--- End of Demonstration ---");
}

// Step 2
class Admin extends User {
    #managedUsers;

    constructor(name, email, userId) {
        super(name, email, userId);
        this.#managedUsers = [];
    }

    addUser(newUser) {
        if (newUser instanceof User) {
            this.#managedUsers.push(newUser);
            console.log(`${newUser.name} (ID: ${newUser.getId()}) has been added by Admin ${this.name}.`);
        } else {
            console.log("Invalid user object. Cannot add.");
        }
    }

    removeUser(userIdToRemove) {
        const initialLength = this.#managedUsers.length;
        this.#managedUsers = this.#managedUsers.filter(user => user.getId() !== userIdToRemove);
        if (this.#managedUsers.length < initialLength) {
            console.log(`User with ID ${userIdToRemove} has been removed by Admin ${this.name}.`);
            return true;
        } else {
            console.log(`User with ID ${userIdToRemove} not found.`);
            return false;
        }
    }

    listManagedUsers() {
        console.log(`\nUsers managed by Admin ${this.name}:`);
        if (this.#managedUsers.length === 0) {
            console.log("No users currently managed.");
        } else {
            this.#managedUsers.forEach(user => {
                console.log(`- Name: ${user.name}, Email: ${user.getEmail()}, ID: ${user.getId()}`);
            });
        }
        return this.#managedUsers;
    }

    performAction() {
        console.log(`${this.name} (Admin) is managing users, adding new accounts, and overseeing system operations.`);
    }
}

if (typeof window !== 'undefined') {
    console.log("--- Demonstrating User Base Class (JavaScript) ---");

    const user1 = new User("Alice Smith", "alice.smith@example.com", "USR001");
    console.log(`Initial User: ${user1.name}, Email: ${user1.getEmail()}, ID: ${user1.getId()}`);

    user1.setEmail("alice.smith.new@example.com");
    console.log(`Updated Email: ${user1.getEmail()}`);

    user1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${user1.getEmail()}`);

    user1.setId("USR001_NEW");
    console.log(`Updated ID: ${user1.getId()}`);

    user1.setId("");
    console.log(`ID after empty attempt: ${user1.getId()}`);

    try {
        user1.performAction();
    } catch (e) {
        console.log(`Expected error for performAction: ${e.message}`);
    }

    console.log("\n--- End of User Base Class Demonstration ---");

    console.log("\n--- Demonstrating Admin Role ---");

    const admin1 = new Admin("John Doe", "john.doe@hospital.com", "ADM001");
    admin1.performAction();

    const doctor1 = new User("Dr. Emily White", "emily.white@hospital.com", "DOC001");
    const patient1 = new User("Robert Green", "robert.green@example.com", "PAT001");
    const doctor2 = new User("Dr. Sarah Brown", "sarah.brown@hospital.com", "DOC002");

    admin1.addUser(doctor1);
    admin1.addUser(patient1);
    admin1.addUser(doctor2);

    admin1.listManagedUsers();

    admin1.removeUser("PAT001");
    admin1.listManagedUsers();

    admin1.removeUser("NONEXISTENT");

    console.log("\n--- End of Admin Role Demonstration ---");
}

// Step 3
class Doctor extends User {
    #specialty;
    #diagnosedPatients;

    constructor(name, email, userId, specialty) {
        super(name, email, userId);
        this.#specialty = specialty;
        this.#diagnosedPatients = [];
    }

    getSpecialty() {
        return this.#specialty;
    }

    setSpecialty(newSpecialty) {
        if (newSpecialty) {
            this.#specialty = newSpecialty;
        } else {
            console.log("Specialty cannot be empty.");
        }
    }

    diagnosePatient(patientName, disease) {
        if (patientName && disease) {
            this.#diagnosedPatients.push({ patientName: patientName, disease: disease });
            console.log(`${this.name} (${this.#specialty}) diagnosed ${patientName} with ${disease}.`);
        } else {
            console.log("Patient name and disease cannot be empty for diagnosis.");
        }
    }

    listDiagnosedPatients() {
        console.log(`\nPatients diagnosed by Dr. ${this.name} (${this.#specialty}):`);
        if (this.#diagnosedPatients.length === 0) {
            console.log("No patients diagnosed yet.");
        } else {
            this.#diagnosedPatients.forEach((diagnosis, index) => {
                console.log(`${index + 1}. Patient: ${diagnosis.patientName}, Disease: ${diagnosis.disease}`);
            });
        }
        return this.#diagnosedPatients;
    }

    performAction() {
        console.log(`${this.name} (Doctor - ${this.#specialty}) is examining patients, making diagnoses, and prescribing treatments.`);
    }
}


if (typeof window !== 'undefined') {
    console.log("--- Demonstrating User Base Class (JavaScript) ---");

    const user1 = new User("Alice Smith", "alice.smith@example.com", "USR001");
    console.log(`Initial User: ${user1.name}, Email: ${user1.getEmail()}, ID: ${user1.getId()}`);

    user1.setEmail("alice.smith.new@example.com");
    console.log(`Updated Email: ${user1.getEmail()}`);

    user1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${user1.getEmail()}`);

    user1.setId("USR001_NEW");
    console.log(`Updated ID: ${user1.getId()}`);

    user1.setId("");
    console.log(`ID after empty attempt: ${user1.getId()}`);

    try {
        user1.performAction();
    } catch (e) {
        console.log(`Expected error for performAction: ${e.message}`);
    }

    console.log("\n--- End of User Base Class Demonstration ---");

    console.log("\n--- Demonstrating Admin Role ---");

    const admin1 = new Admin("John Doe", "john.doe@hospital.com", "ADM001");
    admin1.performAction();

    const doctorUser1 = new User("Dr. Emily White", "emily.white@hospital.com", "DOC001");
    const patientUser1 = new User("Robert Green", "robert.green@example.com", "PAT001");
    const doctorUser2 = new User("Dr. Sarah Brown", "sarah.brown@hospital.com", "DOC002");

    admin1.addUser(doctorUser1);
    admin1.addUser(patientUser1);
    admin1.addUser(doctorUser2);

    admin1.listManagedUsers();

    admin1.removeUser("PAT001");
    admin1.listManagedUsers();

    admin1.removeUser("NONEXISTENT");

    console.log("\n--- End of Admin Role Demonstration ---");

    console.log("\n--- Demonstrating Doctor Role ---");

    const doctor1 = new Doctor("Dr. Alex Johnson", "alex.johnson@hospital.com", "DOC003", "Cardiology");
    doctor1.performAction();

    console.log(`Doctor's Specialty: ${doctor1.getSpecialty()}`);
    doctor1.setSpecialty("Pediatrics");
    console.log(`Updated Doctor's Specialty: ${doctor1.getSpecialty()}`);

    doctor1.diagnosePatient("Maria Lopez", "Hypertension");
    doctor1.diagnosePatient("David Lee", "Arrhythmia");
    doctor1.diagnosePatient("Sophia Chen", "Congestive Heart Failure");

    doctor1.listDiagnosedPatients();

    console.log("\n--- End of Doctor Role Demonstration ---");
}

// Step 4
class Patient extends User {
    #appointments;

    constructor(name, email, userId) {
        super(name, email, userId);
        this.#appointments = [];
    }

    bookAppointment(doctor, date) {
        if (doctor instanceof Doctor && date) {
            this.#appointments.push({ doctorName: doctor.name, date: date, specialty: doctor.getSpecialty() });
            console.log(`${this.name} booked an appointment with Dr. ${doctor.name} (${doctor.getSpecialty()}) on ${date}.`);
        } else {
            console.log("Invalid doctor object or date for booking appointment.");
        }
    }

    viewBookedAppointments() {
        console.log(`\nAppointments for ${this.name}:`);
        if (this.#appointments.length === 0) {
            console.log("No appointments booked yet.");
        } else {
            this.#appointments.forEach((appointment, index) => {
                console.log(`${index + 1}. Doctor: ${appointment.doctorName} (${appointment.specialty}), Date: ${appointment.date}`);
            });
        }
        return this.#appointments;
    }

    performAction() {
        console.log(`${this.name} (Patient) is booking appointments and managing their health records.`);
    }
}


if (typeof window !== 'undefined') {
    console.log("--- Demonstrating User Base Class (JavaScript) ---");

    const user1 = new User("Alice Smith", "alice.smith@example.com", "USR001");
    console.log(`Initial User: ${user1.name}, Email: ${user1.getEmail()}, ID: ${user1.getId()}`);

    user1.setEmail("alice.smith.new@example.com");
    console.log(`Updated Email: ${user1.getEmail()}`);

    user1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${user1.getEmail()}`);

    user1.setId("USR001_NEW");
    console.log(`Updated ID: ${user1.getId()}`);

    user1.setId("");
    console.log(`ID after empty attempt: ${user1.getId()}`);

    try {
        user1.performAction();
    } catch (e) {
        console.log(`Expected error for performAction: ${e.message}`);
    }

    console.log("\n--- End of User Base Class Demonstration ---");

    console.log("\n--- Demonstrating Admin Role ---");

    const admin1 = new Admin("John Doe", "john.doe@hospital.com", "ADM001");
    admin1.performAction();

    const doctorUser1 = new User("Dr. Emily White", "emily.white@hospital.com", "DOC001");
    const patientUser1 = new User("Robert Green", "robert.green@example.com", "PAT001");
    const doctorUser2 = new User("Dr. Sarah Brown", "sarah.brown@hospital.com", "DOC002");

    admin1.addUser(doctorUser1);
    admin1.addUser(patientUser1);
    admin1.addUser(doctorUser2);

    admin1.listManagedUsers();

    admin1.removeUser("PAT001");
    admin1.listManagedUsers();

    admin1.removeUser("NONEXISTENT");

    console.log("\n--- End of Admin Role Demonstration ---");

    console.log("\n--- Demonstrating Doctor Role ---");

    const doctor1 = new Doctor("Dr. Alex Johnson", "alex.johnson@hospital.com", "DOC003", "Cardiology");
    doctor1.performAction();

    console.log(`Doctor's Specialty: ${doctor1.getSpecialty()}`);
    doctor1.setSpecialty("Pediatrics");
    console.log(`Updated Doctor's Specialty: ${doctor1.getSpecialty()}`);

    doctor1.diagnosePatient("Maria Lopez", "Hypertension");
    doctor1.diagnosePatient("David Lee", "Arrhythmia");
    doctor1.diagnosePatient("Sophia Chen", "Congestive Heart Failure");

    doctor1.listDiagnosedPatients();

    console.log("\n--- End of Doctor Role Demonstration ---");

    console.log("\n--- Demonstrating Patient Role ---");

    const patient1 = new Patient("Olivia Taylor", "olivia.taylor@example.com", "PAT002");
    patient1.performAction();

    const doctorForPatient = new Doctor("Dr. Michael Davis", "michael.davis@hospital.com", "DOC004", "General Practice");

    patient1.bookAppointment(doctorForPatient, "2025-07-20");
    patient1.bookAppointment(doctor1, "2025-07-25");

    patient1.viewBookedAppointments();

    console.log("\n--- End of Patient Role Demonstration ---");
}

// Step 5

console.log("\n--- Simulating Hospital Management System Actions ---");

    const adminInstance = new Admin("Admin Bob", "bob.admin@hospital.com", "ADM002");
    const doctorInstance1 = new Doctor("Dr. Jane Smith", "jane.smith@hospital.com", "DOC005", "Dermatology");
    const doctorInstance2 = new Doctor("Dr. Mark Wilson", "mark.wilson@hospital.com", "DOC006", "Orthopedics");
    const patientInstance1 = new Patient("Sarah Connor", "sarah.connor@example.com", "PAT003");
    const patientInstance2 = new Patient("John Rambo", "john.rambo@example.com", "PAT004");

    console.log("\n--- Admin Adding Users ---");
    adminInstance.addUser(doctorInstance1);
    adminInstance.addUser(doctorInstance2);
    adminInstance.addUser(patientInstance1);
    adminInstance.addUser(patientInstance2);
    adminInstance.listManagedUsers();

    console.log("\n--- Doctor Diagnosing Patient ---");
    doctorInstance1.diagnosePatient("Sarah Connor", "Eczema");
    doctorInstance1.diagnosePatient("Linda Hamilton", "Psoriasis");
    doctorInstance1.listDiagnosedPatients();

    console.log("\n--- Patient Booking Appointment ---");
    patientInstance1.bookAppointment(doctorInstance1, "2025-08-01");
    patientInstance2.bookAppointment(doctorInstance2, "2025-08-05");
    patientInstance1.viewBookedAppointments();
    patientInstance2.viewBookedAppointments();

    console.log("\n--- Calling performAction() for all users ---");
    const allUsers = [adminInstance, doctorInstance1, doctorInstance2, patientInstance1, patientInstance2];

    allUsers.forEach(user => {
        user.performAction();
    });

    console.log("\n--- End of Simulation ---");

