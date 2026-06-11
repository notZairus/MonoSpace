import { Router } from "express";
import upload from "../lib/upload";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { rejects } from "assert";

const router = Router();

router.post("/extract", upload.single("file"), async (req, res) => {
  const fileToExtract = req.file;

  if (!fileToExtract) {
    return res.sendStatus(400);
  }

  const output: string = await new Promise((resolve, rejects) => {
    exec(
      `curl -T ${fileToExtract.path} http://localhost:9998/tika/text`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("curl error:", err);
          rejects(err);
        }

        fs.unlink(fileToExtract.path, (err) => {
          console.log(`${fileToExtract.path} deleted.`);
        });

        resolve(stdout);
      },
    );
  });

  const extractedText = output.trimStart().trimEnd().split("   ").join("");

  // should i make ai format it into a proper 

  return res.json({
    extractedText,
  });
});

export default router;
