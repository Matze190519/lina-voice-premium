import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { normalizeSponsor, validateSponsor } from "@/lib/sponsor";
import { toast } from "sonner";
import { Copy, Check, Link as LinkIcon, Smartphone, Instagram, History, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamLink() {
  const [sponsorInput, setSponsorInput] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("sponsor_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse sponsor history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sponsor_history", JSON.stringify(history));
  }, [history]);

  const handleGenerate = () => {
    const normalized = normalizeSponsor(sponsorInput);
    
    if (!validateSponsor(normalized)) {
      setError("Ungültiges Format. Bitte DE/AT/ES + Ziffern eingeben (z.B. DE01581944)");
      setGeneratedLink(null);
      return;
    }

    setError(null);
    const link = `https://ki-voice.net/s/${normalized}`;
    setGeneratedLink(link);
    
    // Add to history if not already present
    if (!history.includes(normalized)) {
      setHistory(prev => [normalized, ...prev].slice(0, 5)); // Keep last 5
    }
    
    toast.success("Link erfolgreich erstellt!");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopiert!`);
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("Verlauf gelöscht");
  };

  const deleteFromHistory = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item !== code));
    toast.success("Eintrag gelöscht");
  };

  const loadFromHistory = (code: string) => {
    setSponsorInput(code);
    const link = `https://ki-voice.net/s/${code}`;
    setGeneratedLink(link);
    setError(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <Card className="bg-card/30 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Dein persönlicher Team-Link</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Trag einmal deine LR-Partnernummer ein – wir erstellen deinen Link. So werden Interessenten dir zugeordnet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sponsor" className="text-white">Deine LR-Partnernummer</Label>
              <div className="flex gap-2">
                <Input
                  id="sponsor"
                  placeholder="DE01581944"
                  value={sponsorInput}
                  onChange={(e) => {
                    setSponsorInput(e.target.value.toUpperCase());
                    setError(null);
                  }}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-600"
                />
                <Button onClick={handleGenerate} className="bg-primary hover:bg-primary/90">
                  Link erstellen
                </Button>
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <p className="text-xs text-gray-500">Format: DE/AT/ES + Zahlen direkt dahinter</p>
            </div>

            {generatedLink && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                <div className="space-y-2">
                  <Label className="text-white">Dein persönlicher Link</Label>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value={generatedLink} 
                      className="bg-black/40 border-white/10 text-green-400 font-mono text-sm"
                    />
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="border-white/10 hover:bg-white/5 shrink-0"
                      onClick={() => copyToClipboard(generatedLink, "Link")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/5 hover:bg-white/10 text-white border border-white/5"
                    onClick={() => copyToClipboard(
                      `Hier ist die Demo/Anfrage-Seite: ${generatedLink}`, 
                      "WhatsApp-Text"
                    )}
                  >
                    <Smartphone className="w-4 h-4 mr-2 text-green-400" />
                    WhatsApp-Text kopieren
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/5 hover:bg-white/10 text-white border border-white/5"
                    onClick={() => copyToClipboard(
                      `LINA Voice Demo 👉 ${generatedLink}`, 
                      "Instagram-Bio"
                    )}
                  >
                    <Instagram className="w-4 h-4 mr-2 text-pink-400" />
                    Instagram-Bio kopieren
                  </Button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-xs text-blue-200 leading-relaxed">
                    <strong>Info:</strong> Die Website merkt sich deinen Sponsor-Code als Merkfeld im Browser des Besuchers, damit Anfragen auch später noch dir zugeordnet werden. Das läuft nach 90 Tagen automatisch ab.
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* History Section */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Card className="bg-card/30 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <History className="w-4 h-4 text-primary" />
                      Zuletzt erstellt
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearHistory}
                      className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 h-8 px-2"
                      title="Alle löschen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {history.map((code) => (
                      <div 
                        key={code}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                        onClick={() => loadFromHistory(code)}
                      >
                        <span className="font-mono text-sm text-gray-300">{code}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(`https://ki-voice.net/s/${code}`, "Link");
                            }}
                            title="Link kopieren"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                            onClick={(e) => deleteFromHistory(code, e)}
                            title="Eintrag löschen"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
