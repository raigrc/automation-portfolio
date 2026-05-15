Read IMPROVEMENTS.md and help me plan or build one of the improvements listed there.

Start by showing me a short summary of what's available, grouped by category, with their IDs and ROI ratings. Then ask which item I want to work on.

Once I pick one:
1. Describe exactly what will change and which files will be touched
2. Ask if I want to plan only or build it now
3. If building: implement it, run `npm run build` from `client/` to verify exit 0, then ask if I want to commit and deploy
4. After completing, update the Status table in IMPROVEMENTS.md to mark the item as done

Rules:
- Follow all constraints in CLAUDE.md (no border-radius, no new UI libraries, Win95 aesthetic throughout)
- Don't touch unrelated code
- Don't auto-commit — ask first
