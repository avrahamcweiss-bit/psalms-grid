import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PsalmsGrid() {
  const [psalms, setPsalms] = useState(null);
  const [selectedPsalm, setSelectedPsalm] = useState(null);
  const [fileLoaded, setFileLoaded] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setPsalms(data.text);
          setFileLoaded(true);
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePrevious = () => {
    if (selectedPsalm > 0) {
      setSelectedPsalm(selectedPsalm - 1);
    }
  };

  const handleNext = () => {
    if (selectedPsalm < psalms.length - 1) {
      setSelectedPsalm(selectedPsalm + 1);
    }
  };

  const gridItems = useMemo(() => {
    if (!psalms) return [];
    return psalms.map((psalm, index) => ({
      id: index + 1,
      content: psalm,
    }));
  }, [psalms]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #faf9f7 100%)',
      padding: '2rem',
      fontFamily: '"Garamond", "Crimson Text", serif',
      direction: 'rtl',
      color: '#2c2c2c',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '300',
          letterSpacing: '0.15em',
          marginBottom: '0.5rem',
          color: '#1a1a1a',
          textTransform: 'uppercase',
        }}>
          תהילים
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          letterSpacing: '0.1em',
          fontWeight: '300',
        }}>
          Psalms
        </p>
      </div>

      {!fileLoaded ? (
        // Upload State
        <div style={{
          maxWidth: '500px',
          margin: '4rem auto',
          textAlign: 'center',
          padding: '3rem 2rem',
          border: '2px dashed #c9c2bb',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.5)',
        }}>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: '#666',
          }}>
            Upload your Psalms JSON file (with Nikkud recommended)
          </p>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              borderRadius: '4px',
              background: '#2c2c2c',
              color: '#fff',
              border: 'none',
              letterSpacing: '0.05em',
            }}
          />
        </div>
      ) : (
        <>
          {/* Grid View */}
          {selectedPsalm === null && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: '0.75rem',
                maxWidth: '800px',
                direction: 'rtl',
              }}>
              {gridItems.map((item) => {
                // Convert number to Hebrew gematria (1-150)
                const getHebrewNumeral = (num) => {
                  const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
                  const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
                  const hundreds = ['', 'ק', 'ר', 'ש', 'ת'];
                  
                  if (num < 1 || num > 150) return '';
                  
                  let result = '';
                  
                  if (num >= 100) {
                    result += hundreds[Math.floor(num / 100)];
                    num = num % 100;
                  }
                  
                  if (num >= 10) {
                    result += tens[Math.floor(num / 10)];
                    num = num % 10;
                  }
                  
                  if (num > 0) {
                    result += ones[num];
                  }
                  
                  return result;
                };
                
                const letter = getHebrewNumeral(item.id);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPsalm(item.id - 1)}
                    style={{
                      padding: '1.5rem',
                      fontSize: '1.3rem',
                      fontWeight: '500',
                      background: '#fff',
                      border: '1px solid #e0d9d0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#2c2c2c',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f9f6f1';
                      e.target.style.borderColor = '#2c2c2c';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.borderColor = '#e0d9d0';
                      e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                      {item.id}
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '300' }}>
                      {letter}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          )}

          {/* Detail View Modal */}
          {selectedPsalm !== null && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
              animation: 'fadeIn 0.3s ease',
            }}>
              <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes slideIn {
                  from {
                    transform: translateY(20px);
                    opacity: 0;
                  }
                  to {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
              `}</style>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                padding: '2.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                animation: 'slideIn 0.3s ease',
                position: 'relative',
              }}>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPsalm(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#999',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#2c2c2c')}
                  onMouseLeave={(e) => (e.target.style.color = '#999')}
                >
                  <X size={24} />
                </button>

                {/* Psalm Number */}
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  color: '#1a1a1a',
                  letterSpacing: '0.05em',
                }}>
                  Psalm {selectedPsalm + 1}
                </h2>
                <div style={{
                  height: '1px',
                  background: '#e0d9d0',
                  marginBottom: '2rem',
                }}></div>

                {/* Psalm Content */}
                <div style={{
                  fontSize: '1.4rem',
                  lineHeight: '2.2',
                  color: '#2c2c2c',
                  marginBottom: '2rem',
                  direction: 'rtl',
                  textAlign: 'right',
                }}>
                  {psalms[selectedPsalm].map((verse, idx) => (
                    <p key={idx} style={{
                      marginBottom: '1rem',
                      fontWeight: '400',
                    }}>
                      <span style={{
                        fontSize: '0.9rem',
                        color: '#999',
                        marginLeft: '0.5rem',
                      }}>
                        {idx + 1}
                      </span>
                      {verse}
                    </p>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #e0d9d0',
                }}>
                  <button
                    onClick={handlePrevious}
                    disabled={selectedPsalm === 0}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: selectedPsalm === 0 ? '#f0ede8' : '#2c2c2c',
                      color: selectedPsalm === 0 ? '#ccc' : '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: selectedPsalm === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPsalm !== 0) {
                        e.target.style.background = '#1a1a1a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPsalm !== 0) {
                        e.target.style.background = '#2c2c2c';
                      }
                    }}
                  >
                    <ChevronRight size={18} /> Previous
                  </button>

                  <span style={{
                    color: '#999',
                    fontSize: '0.9rem',
                    minWidth: '120px',
                    textAlign: 'center',
                  }}>
                    {selectedPsalm + 1} / {psalms.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={selectedPsalm === psalms.length - 1}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: selectedPsalm === psalms.length - 1 ? '#f0ede8' : '#2c2c2c',
                      color: selectedPsalm === psalms.length - 1 ? '#ccc' : '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: selectedPsalm === psalms.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPsalm !== psalms.length - 1) {
                        e.target.style.background = '#1a1a1a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPsalm !== psalms.length - 1) {
                        e.target.style.background = '#2c2c2c';
                      }
                    }}
                  >
                    Next <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={() => setSelectedPsalm(null)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#f0ede8',
                      color: '#2c2c2c',
                      border: '1px solid #e0d9d0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#e0d9d0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f0ede8';
                    }}
                  >
                    Back to Grid
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}