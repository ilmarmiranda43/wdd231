const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming and problem solving using variables, decisions, loops, arrays, and input/output.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course helps students become more organized, efficient, and powerful programmers by using functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course teaches dynamic websites that use JavaScript to respond to events and update content.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseList = document.querySelector('#course-list');
const totalCredits = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');

function displayCourses(courseArray) {
    courseList.innerHTML = '';

    courseArray.forEach((course) => {
        const courseCard = document.createElement('section');
        courseCard.classList.add('course-card');
        courseCard.classList.add(course.completed ? 'completed' : 'not-completed');

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p><strong>${course.title}</strong></p>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
            <p class="status">${course.completed ? 'Completed' : 'Not completed'}</p>
        `;

        courseList.appendChild(courseCard);
    });

    const credits = courseArray.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
}

function setActiveButton(selectedButton) {
    filterButtons.forEach((button) => button.classList.remove('active'));
    selectedButton.classList.add('active');
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveButton(button);

        if (button.id === 'wdd') {
            displayCourses(courses.filter((course) => course.subject === 'WDD'));
        } else if (button.id === 'cse') {
            displayCourses(courses.filter((course) => course.subject === 'CSE'));
        } else {
            displayCourses(courses);
        }
    });
});

displayCourses(courses);
