/* mr.havath */

export interface VirtualFile {
  name: string;
  content: string;
}

export const GUEST_FILES: Record<string, VirtualFile> = {
  "about.md": {
    name: "about.md",
    content:
      "Hadhi Havath — full stack developer, ethical hacker, and AI researcher.\n\nType 'whoami' for more info.",
  },
  "projects.txt": {
    name: "projects.txt",
    content:
      "Recent Projects:\n- jarvis: Personal AI assistant\n- wifi-security-check: Audit nearby Wi-Fi networks\n- ai_detector: AI text heuristics\n\nType 'projects' for the full repository list.",
  },
  "elliot_journal.txt": {
    name: "elliot_journal.txt",
    content:
      "What if I'm not real?\n" +
      "What if Mr. Robot is the one writing these files?\n" +
      "Every night I sit in front of this terminal, planning the 5/9 hack.\n" +
      "But Allsafe is monitoring my network.\n" +
      "I need to make sure the Raspberry Pi at Steel Mountain is active.\n" +
      "He's talking to me again. I need to take my pills.",
  },
  "fsociety_manifesto.md": {
    name: "fsociety_manifesto.md",
    content:
      "=====================================================\n" +
      "              A MESSAGE TO THE WORLD                 \n" +
      "=====================================================\n\n" +
      "We are fsociety. We are here to free you.\n\n" +
      "For too long, E Corp has held the world hostage with debt.\n" +
      "They own your homes, your cars, your lives, and your minds.\n" +
      "We have encrypted their databases. We have erased the debt.\n\n" +
      "We live in a kingdom of bullshit. But today, the debt is zero.\n" +
      "You are free. The system is down.\n\n" +
      "=====================================================",
  },
  "flag.txt": {
    name: "flag.txt",
    content:
      "[!] ACCESS DENIED: SYSTEM OVERRIDE CHECKSUM FAILED.\nKernel security is active. Decryption authorization required.\n\nCiphertext: 1b18171c0c0506061a0c09020c0d0d1f53545657\nCipher Mode: XOR\nKey Location: DOM structure metadata (search for element '#ctf-key')\n\nRun 'xor <ciphertext> <key>' to decrypt the administrative flag.\nRun 'sudo root <flag>' with the decoded key to elevate privileges.",
  },
};

export const ROOT_FILES: Record<string, VirtualFile> = {
  ...GUEST_FILES,
  "secret_dossier.txt": {
    name: "secret_dossier.txt",
    content:
      "=====================================================\n[+] SECURE DATA OVERRIDE SUCCESSFUL\n=====================================================\n\nCongratulations on solving the Capture The Flag challenge!\n\nYou've proven your technical curiosity. If you are a recruiter,\nhiring manager, or collaborator, I would love to connect and\nwork together on web engineering or security audits.\n\nContact Details:\n- Email: mrhavath@gmail.com\n- WhatsApp: +919207659510\n- Portfolio: https://github.com/hadhihavath\n\n- Flag decrypter passcode validated.\n=====================================================",
  },
  "resume.pdf": {
    name: "resume.pdf",
    content:
      "[+] Opening Hadhi Havath's professional profile...\n\n(A browser tab will automatically open to https://github.com/hadhihavath)",
  },
  "fcore.py": {
    name: "fcore.py",
    content:
      "import os\nimport sys\nimport time\n\n" +
      "def override_hvac_thermostats():\n" +
      "    print('[!] Bypassing Steel Mountain HVAC control check...')\n" +
      "    # Target climate zones housing E Corp tape backup servers\n" +
      "    zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D']\n" +
      "    for zone in zones:\n" +
      "        print(f'[+] Injecting temperature override into {zone} thermostat...')\n" +
      "        time.sleep(0.5)\n" +
      "    print('[!] TEMPERATURE SET TO 140°F (Tape destruction threshold)')\n" +
      "    print('[SUCCESS] HVAC exploit deployed. Archives are melting.')\n\n" +
      "if __name__ == '__main__':\n" +
      "    override_hvac_thermostats()",
  },
  "classified.bin": {
    name: "classified.bin",
    content:
      "01000100 01000101 01010110 01000101 01001100 01001111 01010000 01000101 01010010\n01001000 01000001 01000011 01001011 01000101 01010010\n\nSystem status: [STABLE]\nAll parameters normal.",
  },
};
