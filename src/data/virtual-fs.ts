/* mr.havath */

export interface VirtualFile {
  name: string;
  content: string;
}

export const GUEST_FILES: Record<string, VirtualFile> = {
  "about.txt": {
    name: "about.txt",
    content:
      "Hadhi Havath — full stack developer specializing in Python, Django, and modern frontend technologies.\nType 'whoami' or 'skills' for more technical details.",
  },
  "skills.txt": {
    name: "skills.txt",
    content:
      "Technical Stack Highlights:\n- Backend: Python, Django, REST APIs, PHP\n- Frontend: TypeScript, JavaScript, React, Tailwind CSS\n- Tools & OS: Git, Linux, Shell Scripting, Docker",
  },
  "contact.txt": {
    name: "contact.txt",
    content:
      "Feel free to get in touch:\n- Email: mrhavath@gmail.com\n- WhatsApp: +919207659510\n- GitHub: github.com/hadhihavath",
  },
};
