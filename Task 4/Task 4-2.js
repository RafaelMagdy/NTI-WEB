// Task 4 - Part 2 - 🎓 University Management System
// Step 1
class Member {
    #email;
    #memberId;

    constructor(name, email, memberId) {
        this.name = name;
        this.#email = email;
        this.#memberId = memberId;
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
        return this.#memberId;
    }

    setId(newId) {
        if (newId) {
            this.#memberId = newId;
        } else {
            console.log("Member ID cannot be empty. ID not updated.");
        }
    }

    performTask() {
        throw new Error("This method should be overridden by subclasses.");
    }
}

if (typeof window !== 'undefined') {
    console.log("--- Demonstrating Member Base Class (JavaScript) ---");

    const member1 = new Member("John Doe", "john.doe@university.edu", "MEM001");
    console.log(`Initial Member: ${member1.name}, Email: ${member1.getEmail()}, ID: ${member1.getId()}`);

    member1.setEmail("john.doe.new@university.edu");
    console.log(`Updated Email: ${member1.getEmail()}`);

    member1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${member1.getEmail()}`);

    member1.setId("MEM001_NEW");
    console.log(`Updated ID: ${member1.getId()}`);

    member1.setId("");
    console.log(`ID after empty attempt: ${member1.getId()}`);

    try {
        member1.performTask();
    } catch (e) {
        console.log(`Expected error for performTask: ${e.message}`);
    }

    console.log("\n--- End of Member Base Class Demonstration ---");
}

// Step 2
class Professor extends Member {
    #department;
    #coursesTaught;

    constructor(name, email, memberId, department) {
        super(name, email, memberId);
        this.#department = department;
        this.#coursesTaught = [];
    }

    getDepartment() {
        return this.#department;
    }

    setDepartment(newDepartment) {
        if (newDepartment) {
            this.#department = newDepartment;
        } else {
            console.log("Department cannot be empty.");
        }
    }

    addCourse(courseName) {
        if (courseName && !this.#coursesTaught.includes(courseName)) {
            this.#coursesTaught.push(courseName);
            console.log(`${this.name} (Professor in ${this.#department}) is now teaching ${courseName}.`);
        } else if (this.#coursesTaught.includes(courseName)) {
            console.log(`${this.name} is already teaching ${courseName}.`);
        } else {
            console.log("Course name cannot be empty.");
        }
    }

    viewCourses() {
        console.log(`\nCourses taught by Professor ${this.name} (${this.#department}):`);
        if (this.#coursesTaught.length === 0) {
            console.log("No courses assigned yet.");
        } else {
            this.#coursesTaught.forEach((course, index) => {
                console.log(`${index + 1}. ${course}`);
            });
        }
        return this.#coursesTaught;
    }

    performTask() {
        console.log(`${this.name} (Professor in ${this.#department}) is teaching courses, conducting research, and mentoring students.`);
    }
}

if (typeof window !== 'undefined') {
    console.log("--- Demonstrating Member Base Class (JavaScript) ---");

    const member1 = new Member("John Doe", "john.doe@university.edu", "MEM001");
    console.log(`Initial Member: ${member1.name}, Email: ${member1.getEmail()}, ID: ${member1.getId()}`);

    member1.setEmail("john.doe.new@university.edu");
    console.log(`Updated Email: ${member1.getEmail()}`);

    member1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${member1.getEmail()}`);

    member1.setId("MEM001_NEW");
    console.log(`Updated ID: ${member1.getId()}`);

    member1.setId("");
    console.log(`ID after empty attempt: ${member1.getId()}`);

    try {
        member1.performTask();
    } catch (e) {
        console.log(`Expected error for performTask: ${e.message}`);
    }

    console.log("\n--- End of Member Base Class Demonstration ---");

    console.log("\n--- Demonstrating Professor Role ---");

    const prof1 = new Professor("Dr. Alan Turing", "alan.turing@university.edu", "PROF001", "Computer Science");
    prof1.performTask();

    console.log(`Professor's Department: ${prof1.getDepartment()}`);
    prof1.setDepartment("Artificial Intelligence");
    console.log(`Updated Professor's Department: ${prof1.getDepartment()}`);

    prof1.addCourse("Data Structures");
    prof1.addCourse("Algorithms");
    prof1.addCourse("Operating Systems");
    prof1.addCourse("Data Structures");

    prof1.viewCourses();

    console.log("\n--- End of Professor Role Demonstration ---");
}

// Step 3
class Student extends Member {
    #major;
    #enrolledCourses;

    constructor(name, email, memberId, major) {
        super(name, email, memberId);
        this.#major = major;
        this.#enrolledCourses = [];
    }

    getMajor() {
        return this.#major;
    }

    setMajor(newMajor) {
        if (newMajor) {
            this.#major = newMajor;
        } else {
            console.log("Major cannot be empty.");
        }
    }

    enrollInCourse(courseName) {
        if (courseName && !this.#enrolledCourses.includes(courseName)) {
            this.#enrolledCourses.push(courseName);
            console.log(`${this.name} (Student - ${this.#major}) has enrolled in ${courseName}.`);
        } else if (this.#enrolledCourses.includes(courseName)) {
            console.log(`${this.name} is already enrolled in ${courseName}.`);
        } else {
            console.log("Course name cannot be empty.");
        }
    }

    viewEnrolledCourses() {
        console.log(`\nCourses enrolled by ${this.name} (Major: ${this.#major}):`);
        if (this.#enrolledCourses.length === 0) {
            console.log("No courses enrolled yet.");
        } else {
            this.#enrolledCourses.forEach((course, index) => {
                console.log(`${index + 1}. ${course}`);
            });
        }
        return this.#enrolledCourses;
    }

    performTask() {
        console.log(`${this.name} (Student - ${this.#major}) is attending classes, completing assignments, and preparing for exams.`);
    }
}


if (typeof window !== 'undefined') {
    console.log("--- Demonstrating Member Base Class (JavaScript) ---");

    const member1 = new Member("John Doe", "john.doe@university.edu", "MEM001");
    console.log(`Initial Member: ${member1.name}, Email: ${member1.getEmail()}, ID: ${member1.getId()}`);

    member1.setEmail("john.doe.new@university.edu");
    console.log(`Updated Email: ${member1.getEmail()}`);

    member1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${member1.getEmail()}`);

    member1.setId("MEM001_NEW");
    console.log(`Updated ID: ${member1.getId()}`);

    member1.setId("");
    console.log(`ID after empty attempt: ${member1.getId()}`);

    try {
        member1.performTask();
    } catch (e) {
        console.log(`Expected error for performTask: ${e.message}`);
    }

    console.log("\n--- End of Member Base Class Demonstration ---");

    console.log("\n--- Demonstrating Professor Role ---");

    const prof1 = new Professor("Dr. Alan Turing", "alan.turing@university.edu", "PROF001", "Computer Science");
    prof1.performTask();

    console.log(`Professor's Department: ${prof1.getDepartment()}`);
    prof1.setDepartment("Artificial Intelligence");
    console.log(`Updated Professor's Department: ${prof1.getDepartment()}`);

    prof1.addCourse("Data Structures");
    prof1.addCourse("Algorithms");
    prof1.addCourse("Operating Systems");
    prof1.addCourse("Data Structures");

    prof1.viewCourses();

    console.log("\n--- End of Professor Role Demonstration ---");

    console.log("\n--- Demonstrating Student Role ---");

    const student1 = new Student("Alice Wonderland", "alice.w@university.edu", "STUD001", "Literature");
    student1.performTask();

    console.log(`Student's Major: ${student1.getMajor()}`);
    student1.setMajor("Creative Writing");
    console.log(`Updated Student's Major: ${student1.getMajor()}`);

    student1.enrollInCourse("Literary Theory");
    student1.enrollInCourse("Poetry Workshop");
    student1.enrollInCourse("Literary Theory");

    student1.viewEnrolledCourses();

    console.log("\n--- End of Student Role Demonstration ---");
}

// Step 4
class Admin extends Member {
    #managedMembers;

    constructor(name, email, memberId) {
        super(name, email, memberId);
        this.#managedMembers = [];
    }

    addMember(newMember) {
        if (newMember instanceof Member) {
            this.#managedMembers.push(newMember);
            console.log(`${newMember.name} (ID: ${newMember.getId()}) has been added by Admin ${this.name}.`);
        } else {
            console.log("Invalid member object. Cannot add.");
        }
    }

    removeMember(memberIdToRemove) {
        const initialLength = this.#managedMembers.length;
        this.#managedMembers = this.#managedMembers.filter(member => member.getId() !== memberIdToRemove);
        if (this.#managedMembers.length < initialLength) {
            console.log(`Member with ID ${memberIdToRemove} has been removed by Admin ${this.name}.`);
            return true;
        } else {
            console.log(`Member with ID ${memberIdToRemove} not found.`);
            return false;
        }
    }

    listManagedMembers() {
        console.log(`\nMembers managed by Admin ${this.name}:`);
        if (this.#managedMembers.length === 0) {
            console.log("No members currently managed.");
        } else {
            this.#managedMembers.forEach(member => {
                console.log(`- Name: ${member.name}, Email: ${member.getEmail()}, ID: ${member.getId()}`);
            });
        }
        return this.#managedMembers;
    }

    performTask() {
        console.log(`${this.name} (Admin) is managing university members, adding/removing accounts, and overseeing institutional operations.`);
    }
}


if (typeof window !== 'undefined') {
    console.log("--- Demonstrating Member Base Class (JavaScript) ---");

    const member1 = new Member("John Doe", "john.doe@university.edu", "MEM001");
    console.log(`Initial Member: ${member1.name}, Email: ${member1.getEmail()}, ID: ${member1.getId()}`);

    member1.setEmail("john.doe.new@university.edu");
    console.log(`Updated Email: ${member1.getEmail()}`);

    member1.setEmail("invalid-email");
    console.log(`Email after invalid attempt: ${member1.getEmail()}`);

    member1.setId("MEM001_NEW");
    console.log(`Updated ID: ${member1.getId()}`);

    member1.setId("");
    console.log(`ID after empty attempt: ${member1.getId()}`);

    try {
        member1.performTask();
    } catch (e) {
        console.log(`Expected error for performTask: ${e.message}`);
    }

    console.log("\n--- End of Member Base Class Demonstration ---");

    console.log("\n--- Demonstrating Professor Role ---");

    const prof1 = new Professor("Dr. Alan Turing", "alan.turing@university.edu", "PROF001", "Computer Science");
    prof1.performTask();

    console.log(`Professor's Department: ${prof1.getDepartment()}`);
    prof1.setDepartment("Artificial Intelligence");
    console.log(`Updated Professor's Department: ${prof1.getDepartment()}`);

    prof1.addCourse("Data Structures");
    prof1.addCourse("Algorithms");
    prof1.addCourse("Operating Systems");
    prof1.addCourse("Data Structures");

    prof1.viewCourses();

    console.log("\n--- End of Professor Role Demonstration ---");

    console.log("\n--- Demonstrating Student Role ---");

    const student1 = new Student("Alice Wonderland", "alice.w@university.edu", "STUD001", "Literature");
    student1.performTask();

    console.log(`Student's Major: ${student1.getMajor()}`);
    student1.setMajor("Creative Writing");
    console.log(`Updated Student's Major: ${student1.getMajor()}`);

    student1.enrollInCourse("Literary Theory");
    student1.enrollInCourse("Poetry Workshop");
    student1.enrollInCourse("Literary Theory");

    student1.viewEnrolledCourses();

    console.log("\n--- End of Student Role Demonstration ---");

    console.log("\n--- Demonstrating Admin Role ---");

    const admin1 = new Admin("Dean Smith", "dean.smith@university.edu", "ADM001");
    admin1.performTask();

    const newProf = new Professor("Dr. Grace Hopper", "grace.h@university.edu", "PROF002", "Computer Science");
    const newStudent = new Student("Bob Johnson", "bob.j@university.edu", "STUD002", "Physics");

    admin1.addMember(newProf);
    admin1.addMember(newStudent);
    admin1.listManagedMembers();

    admin1.removeMember("STUD002");
    admin1.listManagedMembers();
    admin1.removeMember("NONEXISTENT");

    console.log("\n--- End of Admin Role Demonstration ---");
}

// Step 5
console.log("\n--- Simulating University Management System Actions ---");

    const universityAdmin = new Admin("Chancellor Williams", "chancellor.williams@university.edu", "ADM003");
    const profPhysics = new Professor("Dr. Marie Curie", "marie.curie@university.edu", "PROF003", "Physics");
    const studentCompSci = new Student("Ada Lovelace", "ada.l@university.edu", "STUD003", "Computer Science");
    const studentMath = new Student("Carl Gauss", "carl.g@university.edu", "STUD004", "Mathematics");

    console.log("\n--- Admin Adding Members ---");
    universityAdmin.addMember(profPhysics);
    universityAdmin.addMember(studentCompSci);
    universityAdmin.addMember(studentMath);
    universityAdmin.listManagedMembers();

    console.log("\n--- Professor Adding Courses ---");
    profPhysics.addCourse("Quantum Mechanics");
    profPhysics.addCourse("Thermodynamics");
    profPhysics.viewCourses();

    console.log("\n--- Student Enrolling in Courses ---");
    studentCompSci.enrollInCourse("Data Structures");
    studentCompSci.enrollInCourse("Algorithms");
    studentCompSci.viewEnrolledCourses();

    studentMath.enrollInCourse("Calculus I");
    studentMath.enrollInCourse("Linear Algebra");
    studentMath.viewEnrolledCourses();

    console.log("\n--- Calling performTask() for all members ---");
    const allUniversityMembers = [universityAdmin, profPhysics, studentCompSci, studentMath];

    allUniversityMembers.forEach(member => {
        member.performTask();
    });

    console.log("\n--- End of University Management System Simulation ---");