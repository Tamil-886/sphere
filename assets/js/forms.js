/**
 * CampSphere - Forms, Quiz & Enrollment Wizard Controller
 * assets/js/forms.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // Centralized Payment Database Storage Helper
  // ------------------------------------------------------------------------
  function recordCentralizedPayment(paymentRecord) {
    if (!paymentRecord || !paymentRecord.transactionId) return;

    // 1. Save to active user record in campsphere_registered_users
    const activeId = localStorage.getItem('campsphere_active_user_id');
    let users = [];
    try { users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]'); } catch (err) {}
    let session = null;
    try { session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null'); } catch (err) {}

    let activeUser = users.find(u => 
      (activeId && u.id === activeId) || 
      (session && session.id && u.id === session.id) || 
      (u.email && session && session.email && u.email.toLowerCase() === session.email.toLowerCase()) || 
      (u.email && paymentRecord.userEmail && u.email.toLowerCase() === paymentRecord.userEmail.toLowerCase())
    );

    if (activeUser) {
      if (!activeUser.payments) activeUser.payments = [];
      if (!activeUser.payments.some(p => p.transactionId === paymentRecord.transactionId)) {
        activeUser.payments.unshift(paymentRecord);
        localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
      }
    }

    // 2. Save to global campsphere_payments
    let globalPayments = [];
    try { globalPayments = JSON.parse(localStorage.getItem('campsphere_payments') || '[]'); } catch (err) {}
    if (!globalPayments.some(p => p.transactionId === paymentRecord.transactionId)) {
      globalPayments.unshift(paymentRecord);
      localStorage.setItem('campsphere_payments', JSON.stringify(globalPayments));
    }
    localStorage.setItem('campsphere_latest_payment', JSON.stringify(paymentRecord));
  }
  window.recordCentralizedPayment = recordCentralizedPayment;

  // ------------------------------------------------------------------------
  // 1. Enrollment Wizard Flow
  // ------------------------------------------------------------------------
  const enrollmentForm = document.getElementById('enrollmentWizardForm');
  if (enrollmentForm) {
    let currentStep = 1;
    const totalSteps = 6;
    const stepNames = [
      'Guardian Details',
      'Camper Profile',
      'Program & Dates',
      'Medical & Safety',
      'Add-ons & Options',
      'Payment & Submit'
    ];

    const panels = document.querySelectorAll('.wizard-panel');
    const stepLabels = document.querySelectorAll('.step-badge-item, .wizard-step-label');
    const progressBar = document.getElementById('wizardProgressBar');
    const stepBadge = document.getElementById('wizardStepCounterBadge');
    const prevBtn = document.getElementById('wizardPrevBtn');
    const nextBtn = document.getElementById('wizardNextBtn');
    const submitBtn = document.getElementById('wizardSubmitBtn');
    const sidebarEnrollBtn = document.getElementById('sidebarEnrollBtn');

    // Pricing & Summary elements
    const programSelect = document.getElementById('wizardProgramSelect');
    const sessionSelect = document.getElementById('wizardSessionSelect');
    const addOnCheckboxes = document.querySelectorAll('.wizard-addon-check');
    const summaryParent = document.getElementById('summaryParentName');
    const summaryCamper = document.getElementById('summaryCamperName');
    const summaryProgram = document.getElementById('summaryProgramName');
    const summarySession = document.getElementById('summarySessionDates');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryAddons = document.getElementById('summaryAddonsTotal');
    const summaryTotal = document.getElementById('summaryGrandTotal');

    // Auto-prefill Guardian if logged in or defaults
    function prefillUserData() {
      let session = null;
      try {
        session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
      } catch (e) {
        session = null;
      }

      const fnInput = document.getElementById('guardianFirstName');
      const lnInput = document.getElementById('guardianLastName');
      const emInput = document.getElementById('guardianEmail');
      const phInput = document.getElementById('guardianPhone');
      const addrInput = document.getElementById('guardianAddress');
      const cardholderInput = document.getElementById('cardholderName');
      const emergNameInput = document.getElementById('camperEmergencyName');
      const emergPhoneInput = document.getElementById('camperEmergencyPhone');

      if (session && session.loggedIn) {
        const firstName = session.firstName || (session.name ? session.name.split(' ')[0] : 'Sarah');
        const lastName = session.lastName || (session.name && session.name.split(' ').length > 1 ? session.name.split(' ').slice(1).join(' ') : 'Watson');
        const fullName = session.name || `${firstName} ${lastName}`.trim();
        const email = session.email || 'parent@campsphere.com';
        const phone = session.phone || '(555) 019-2834';
        const address = session.address || '4288 Meadow Pine Way, South Lake Tahoe, CA 96150';

        if (fnInput) fnInput.value = firstName;
        if (lnInput) lnInput.value = lastName;
        if (emInput) emInput.value = email;
        if (phInput) phInput.value = phone;
        if (addrInput) addrInput.value = address;
        if (cardholderInput) cardholderInput.value = fullName;
        if (emergNameInput) emergNameInput.value = fullName;
        if (emergPhoneInput) emergPhoneInput.value = phone;
        if (summaryParent) summaryParent.textContent = fullName;
      } else {
        if (fnInput && !fnInput.value) fnInput.value = 'Sarah';
        if (lnInput && !lnInput.value) lnInput.value = 'Watson';
        if (emInput && !emInput.value) emInput.value = 'sarah.watson@example.com';
        if (phInput && !phInput.value) phInput.value = '(555) 019-2834';
        if (addrInput && !addrInput.value) addrInput.value = '4288 Meadow Pine Way, South Lake Tahoe, CA 96150';
        if (cardholderInput && !cardholderInput.value) cardholderInput.value = 'Sarah Watson';
        if (emergNameInput && !emergNameInput.value) emergNameInput.value = 'Sarah Watson';
        if (emergPhoneInput && !emergPhoneInput.value) emergPhoneInput.value = '(555) 019-2834';
      }
    }

    // Check URL parameters for program selection
    function checkUrlProgramParam() {
      const urlParams = new URLSearchParams(window.location.search);
      const progParam = urlParams.get('program') || urlParams.get('id');
      if (progParam && programSelect) {
        for (let i = 0; i < programSelect.options.length; i++) {
          const opt = programSelect.options[i];
          const optId = opt.getAttribute('data-id');
          if (
            (optId && optId.toLowerCase() === progParam.toLowerCase()) ||
            opt.value.toLowerCase() === progParam.toLowerCase() ||
            opt.value.toLowerCase().includes(progParam.toLowerCase()) ||
            opt.textContent.toLowerCase().includes(progParam.toLowerCase())
          ) {
            programSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    prefillUserData();
    checkUrlProgramParam();

    function updateSummary() {
      // Guardian & Camper Names
      const gFn = document.getElementById('guardianFirstName')?.value.trim() || 'Sarah';
      const gLn = document.getElementById('guardianLastName')?.value.trim() || 'Watson';
      if (summaryParent) summaryParent.textContent = `${gFn} ${gLn}`.trim();

      const cFn = document.getElementById('camperFirstName')?.value.trim() || 'Emma';
      const cLn = document.getElementById('camperLastName')?.value.trim() || 'Watson';
      const cAge = document.getElementById('camperAge')?.value.trim() || '8';
      if (summaryCamper) summaryCamper.textContent = `${cFn} ${cLn} (Age ${cAge})`.trim();

      // Program & Session
      const selectedOpt = programSelect ? programSelect.options[programSelect.selectedIndex] : null;
      const progId = selectedOpt?.getAttribute('data-id');
      const basePrice = selectedOpt ? parseFloat(selectedOpt.getAttribute('data-price') || 395) : 395;
      const progName = selectedOpt ? selectedOpt.textContent.split('(')[0].trim() : 'Junior Robotics & Python Coding Camp';
      const progTrack = selectedOpt?.getAttribute('data-track') || 'STEM & Robotics Track';
      let progImg = selectedOpt?.getAttribute('data-img') || 'assets/images/junior_robotics_python_coding.jpeg';

      // Fallback lookup from CAMPSPHERE_PROGRAMS dataset if available
      if (window.CAMPSPHERE_PROGRAMS && progId && window.CAMPSPHERE_PROGRAMS[progId]) {
        const pData = window.CAMPSPHERE_PROGRAMS[progId];
        if (pData.images && pData.images[0]) {
          progImg = pData.images[0];
        } else if (pData.image) {
          progImg = pData.image;
        }
      }

      const progLoc = selectedOpt?.getAttribute('data-loc') || 'Pine Innovation Lab #2';
      const progAge = selectedOpt?.getAttribute('data-age') || 'Ages 8 – 14';

      // Update Summary Sidebar
      if (summaryProgram) summaryProgram.textContent = progName;
      const summaryCat = document.getElementById('summaryProgramCategory');
      if (summaryCat) summaryCat.textContent = progTrack;
      const summaryImg = document.getElementById('summaryProgramImage');
      if (summaryImg) {
        summaryImg.src = progImg;
        summaryImg.alt = progName;
        summaryImg.onerror = function() {
          this.onerror = null;
          this.src = 'assets/images/junior_robotics_python_coding.jpeg';
        };
      }

      if (summarySession && sessionSelect) {
        summarySession.textContent = sessionSelect.value || 'June 15 – June 19, 2026';
      }

      // Update Step 3 Spotlight Card
      const spotTitle = document.getElementById('wizardSelectedProgTitle');
      if (spotTitle) spotTitle.textContent = progName;
      const spotBadge = document.getElementById('wizardSelectedProgBadge');
      if (spotBadge) spotBadge.textContent = progTrack;
      const spotImg = document.getElementById('wizardSelectedProgImage');
      if (spotImg) {
        spotImg.src = progImg;
        spotImg.alt = progName;
        spotImg.onerror = function() {
          this.onerror = null;
          this.src = 'assets/images/junior_robotics_python_coding.jpeg';
        };
      }
      const spotAgeLoc = document.getElementById('wizardSelectedProgAgeLoc');
      if (spotAgeLoc) spotAgeLoc.innerHTML = `<i class="bi bi-geo-alt-fill text-danger me-1"></i>${progLoc} • ${progAge}`;
      const spotPrice = document.getElementById('wizardSelectedProgPrice');
      if (spotPrice) spotPrice.textContent = `$${basePrice.toFixed(2)} / wk`;

      // Add-ons
      let addonsTotal = 0;
      addOnCheckboxes.forEach(cb => {
        if (cb.checked) {
          addonsTotal += parseFloat(cb.getAttribute('data-price') || 0);
        }
      });

      const grandTotal = basePrice + addonsTotal;

      if (summarySubtotal) summarySubtotal.textContent = `$${basePrice.toFixed(2)}`;
      if (summaryAddons) summaryAddons.textContent = `$${addonsTotal.toFixed(2)}`;
      if (summaryTotal) summaryTotal.textContent = `$${grandTotal.toFixed(2)}`;
    }

    // Event listeners for live summary
    if (programSelect) programSelect.addEventListener('change', updateSummary);
    if (sessionSelect) sessionSelect.addEventListener('change', updateSummary);
    addOnCheckboxes.forEach(cb => cb.addEventListener('change', updateSummary));
    
    ['guardianFirstName', 'guardianLastName', 'camperFirstName', 'camperLastName', 'camperAge'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateSummary);
    });

    function showStep(step) {
      currentStep = step;

      // Auto-propagate guardian name/phone to emergency contact and cardholder name if empty
      const gFn = document.getElementById('guardianFirstName')?.value.trim() || 'Sarah';
      const gLn = document.getElementById('guardianLastName')?.value.trim() || 'Watson';
      const gFull = `${gFn} ${gLn}`.trim();
      const gPh = document.getElementById('guardianPhone')?.value.trim() || '(555) 019-2834';

      const emName = document.getElementById('camperEmergencyName');
      if (emName && !emName.value.trim()) emName.value = gFull;
      const emPhone = document.getElementById('camperEmergencyPhone');
      if (emPhone && !emPhone.value.trim()) emPhone.value = gPh;
      const cardName = document.getElementById('cardholderName');
      if (cardName && !cardName.value.trim()) cardName.value = gFull;

      panels.forEach((p, idx) => {
        p.classList.toggle('active', idx + 1 === step);
      });

      stepLabels.forEach((label, idx) => {
        const stepNum = idx + 1;
        label.classList.toggle('active', stepNum === step);
        label.classList.toggle('completed', stepNum < step);
        label.classList.toggle('fw-bold', stepNum === step);
        label.classList.toggle('text-primary', stepNum === step);
      });

      if (progressBar) {
        const percent = Math.round((step / totalSteps) * 100);
        progressBar.style.width = `${percent}%`;
        progressBar.setAttribute('aria-valuenow', percent);
      }

      if (stepBadge) {
        stepBadge.textContent = `Step ${step} of ${totalSteps}: ${stepNames[step - 1]}`;
      }

      if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
      if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : 'inline-flex';
      if (submitBtn) submitBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';

      if (sidebarEnrollBtn) {
        if (step === totalSteps) {
          sidebarEnrollBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Complete Enrollment';
          sidebarEnrollBtn.classList.remove('btn-primary');
          sidebarEnrollBtn.classList.add('btn-accent');
        } else {
          sidebarEnrollBtn.innerHTML = 'Next Step <i class="bi bi-arrow-right ms-1"></i>';
        }
      }

      updateSummary();
    }

    function validateStep(step) {
      const activePanel = document.querySelector(`.wizard-panel[data-step="${step}"]`);
      if (!activePanel) return true;

      const requiredInputs = activePanel.querySelectorAll('[required]');
      let isValid = true;
      let firstInvalidInput = null;

      requiredInputs.forEach(input => {
        if (input.type === 'checkbox' && !input.checked) {
          input.classList.add('is-invalid');
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        } else if (input.type !== 'checkbox' && !input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        } else if (input.type === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
          input.classList.add('is-invalid');
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (!isValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        if (window.showCampToast) {
          window.showCampToast(`Please fill out all required fields in Step ${step} (${stepNames[step - 1]}) to proceed.`, 'danger', 'Required Fields Missing');
        }
      }

      return isValid;
    }

    // Step indicators click support
    stepLabels.forEach((label, idx) => {
      label.style.cursor = 'pointer';
      label.addEventListener('click', () => {
        const targetStep = idx + 1;
        if (targetStep < currentStep) {
          showStep(targetStep);
          window.scrollTo({ top: 150, behavior: 'smooth' });
        } else if (targetStep > currentStep) {
          let canProceed = true;
          for (let s = currentStep; s < targetStep; s++) {
            if (!validateStep(s)) {
              showStep(s);
              canProceed = false;
              break;
            }
          }
          if (canProceed) {
            showStep(targetStep);
            window.scrollTo({ top: 150, behavior: 'smooth' });
          }
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < totalSteps) {
            showStep(currentStep + 1);
            window.scrollTo({ top: 150, behavior: 'smooth' });
          }
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          showStep(currentStep - 1);
          window.scrollTo({ top: 150, behavior: 'smooth' });
        }
      });
    }

    if (sidebarEnrollBtn) {
      sidebarEnrollBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          if (validateStep(currentStep)) {
            showStep(currentStep + 1);
            window.scrollTo({ top: 150, behavior: 'smooth' });
          }
        } else {
          enrollmentForm.requestSubmit();
        }
      });
    }

    // Complete & Submit Enrollment
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all steps from 1 to totalSteps
      for (let s = 1; s <= totalSteps; s++) {
        if (!validateStep(s)) {
          showStep(s);
          window.scrollTo({ top: 150, behavior: 'smooth' });
          return;
        }
      }

      // 1. Collect Guardian Information
      const gFirstName = document.getElementById('guardianFirstName')?.value.trim() || 'Sarah';
      const gLastName = document.getElementById('guardianLastName')?.value.trim() || 'Watson';
      const gFullName = `${gFirstName} ${gLastName}`.trim();
      const gEmail = document.getElementById('guardianEmail')?.value.trim().toLowerCase() || 'parent@campsphere.com';
      const gPhone = document.getElementById('guardianPhone')?.value.trim() || '(555) 019-2834';
      const gAddress = document.getElementById('guardianAddress')?.value.trim() || '4288 Meadow Pine Way, South Lake Tahoe, CA 96150';
      const gRelationship = document.getElementById('guardianRelationship')?.value || 'Mother';

      // 2. Collect Camper Information
      const cFirstName = document.getElementById('camperFirstName')?.value.trim() || 'Emma';
      const cLastName = document.getElementById('camperLastName')?.value.trim() || 'Watson';
      const camperFullName = `${cFirstName} ${cLastName}`.trim();
      const camperAge = document.getElementById('camperAge')?.value.trim() || '8';
      const camperDOB = document.getElementById('camperDOB')?.value || '2018-04-12';
      const camperGender = document.getElementById('camperGender')?.value || 'Female';
      const camperGrade = document.getElementById('camperGrade')?.value.trim() || '3rd Grade';
      const camperTShirt = document.getElementById('camperTShirt')?.value || 'Youth Medium (YM)';

      // 3. Collect Program & Session Details
      const selectedOpt = programSelect ? programSelect.options[programSelect.selectedIndex] : null;
      const progId = selectedOpt?.getAttribute('data-id') || 'prog-1';
      const programTitle = selectedOpt ? selectedOpt.textContent.split('(')[0].trim() : 'Junior Robotics & Python Coding Camp';
      const track = selectedOpt?.getAttribute('data-track') || 'STEM & Robotics Track';
      const location = selectedOpt?.getAttribute('data-loc') || 'Pine Innovation Lab #2';
      const counselor = selectedOpt?.getAttribute('data-couns') || 'Jessica Vance, M.S.';
      const programImage = selectedOpt?.getAttribute('data-img') || 'assets/images/junior_robotics_python_coding.jpeg';
      const programAge = selectedOpt?.getAttribute('data-age') || 'Ages 8 – 14';
      const sessionDate = sessionSelect ? sessionSelect.value : 'June 15 – June 19, 2026';
      const expLevel = document.querySelector('input[name="expLevel"]:checked')?.value || 'Beginner';

      // 4. Collect Medical & Safety Details
      const camperAllergies = document.getElementById('camperAllergies')?.value.trim() || 'None reported';
      const emergencyContactName = document.getElementById('camperEmergencyName')?.value.trim() || gFullName;
      const emergencyContactPhone = document.getElementById('camperEmergencyPhone')?.value.trim() || gPhone;
      const pediatrician = document.getElementById('camperDoctor')?.value.trim() || 'Tahoe Pediatrics ((555) 234-5678)';
      const swimLevel = document.getElementById('camperSwimLevel')?.value || 'Intermediate';
      const specialNotes = document.getElementById('specialNotes')?.value.trim() || '';

      // 5. Collect Add-ons & Financials
      const selectedAddons = [];
      addOnCheckboxes.forEach(cb => {
        if (cb.checked) selectedAddons.push(cb.getAttribute('data-name') || 'Add-on');
      });
      const totalPaid = summaryTotal?.textContent || '$395.00';
      const bookingId = 'CS-' + Math.floor(100000 + Math.random() * 900000);
      const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      // Create new Enrollment Object
      const newEnrollment = {
        id: bookingId,
        transactionId: bookingId,
        programId: progId,
        programName: programTitle,
        programImage: programImage,
        programCategory: track,
        track: track,
        age: programAge,
        guardianName: gFullName,
        guardianEmail: gEmail,
        guardianPhone: gPhone,
        guardianAddress: gAddress,
        childName: camperFullName,
        childAge: parseInt(camperAge) || 8,
        childDob: camperDOB,
        childGrade: camperGrade,
        childGender: camperGender,
        sessionDate: sessionDate,
        amount: totalPaid,
        addons: selectedAddons,
        status: 'Confirmed',
        enrollmentStatus: 'Confirmed',
        paidStatus: 'Paid in Full',
        paymentStatus: 'Paid in Full',
        dateCreated: todayFormatted,
        enrollmentDate: todayFormatted,
        location: location,
        counselor: counselor,
        allergies: camperAllergies,
        emergencyContact: `${emergencyContactName} - ${emergencyContactPhone}`,
        doctor: pediatrician,
        pickupPin: '8492'
      };

      // 1. Save to campsphere_enrollments
      let existingEnrollments = [];
      try {
        existingEnrollments = JSON.parse(localStorage.getItem('campsphere_enrollments') || '[]');
      } catch (err) {
        existingEnrollments = [];
      }
      existingEnrollments.unshift(newEnrollment);
      localStorage.setItem('campsphere_enrollments', JSON.stringify(existingEnrollments));
      localStorage.setItem('campsphere_latest_enrollment', JSON.stringify(newEnrollment));

      // 2. Save / Update Camper in campsphere_children
      let existingChildren = [];
      try {
        existingChildren = JSON.parse(localStorage.getItem('campsphere_children') || '[]');
      } catch (err) {
        existingChildren = [];
      }
      let matchedChild = existingChildren.find(c => c.name.toLowerCase() === camperFullName.toLowerCase());
      if (!matchedChild) {
        matchedChild = {
          id: 'CH-' + Math.floor(100 + Math.random() * 900),
          name: camperFullName,
          dob: camperDOB,
          age: parseInt(camperAge) || 8,
          grade: camperGrade,
          allergies: camperAllergies,
          medications: 'None',
          dietary: camperAllergies.toLowerCase().includes('peanut') || camperAllergies.toLowerCase().includes('nut') ? 'Nut-Free Table Required' : 'Standard Chef Lunch',
          emergencyContact: `${emergencyContactName} - ${emergencyContactPhone}`,
          doctor: pediatrician,
          authorizedPickups: `${gFullName} (${gRelationship})`,
          avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&auto=format&fit=crop&q=80',
          activeCamp: programTitle,
          sessionDate: sessionDate,
          status: 'Active Camper'
        };
        existingChildren.unshift(matchedChild);
      } else {
        matchedChild.activeCamp = programTitle;
        matchedChild.sessionDate = sessionDate;
        if (camperAllergies && camperAllergies !== 'None reported') matchedChild.allergies = camperAllergies;
      }
      localStorage.setItem('campsphere_children', JSON.stringify(existingChildren));

      // 3. Save to active user record in campsphere_registered_users
      const activeId = localStorage.getItem('campsphere_active_user_id');
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
      } catch (err) {
        users = [];
      }
      let activeUser = users.find(u => u.id === activeId || (u.email && u.email.toLowerCase() === gEmail.toLowerCase()));
      if (activeUser) {
        if (!activeUser.enrollments) activeUser.enrollments = [];
        if (!activeUser.children) activeUser.children = [];
        activeUser.enrollments.unshift(newEnrollment);
        if (!activeUser.children.find(c => c.name.toLowerCase() === camperFullName.toLowerCase())) {
          activeUser.children.unshift(matchedChild);
        }
        localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
      } else {
        // Create new registered user account if not yet created
        const newUser = {
          id: 'usr_' + Date.now(),
          firstName: gFirstName,
          lastName: gLastName,
          name: gFullName,
          email: gEmail,
          phone: gPhone,
          address: gAddress,
          pickupPin: '8492',
          registeredAt: new Date().toISOString(),
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
          children: [matchedChild],
          enrollments: [newEnrollment]
        };
        users.push(newUser);
        localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
        localStorage.setItem('campsphere_active_user_id', newUser.id);
        
        // Update user session
        const session = {
          loggedIn: true,
          id: newUser.id,
          name: gFullName,
          firstName: gFirstName,
          lastName: gLastName,
          email: gEmail,
          phone: gPhone,
          role: 'parent',
          avatar: newUser.avatar,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('campsphere_user_session', JSON.stringify(session));
      }

      // 4. Save to centralized payment records
      const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmountNum = parseFloat(totalPaid.replace(/[^0-9.]/g, '')) || 395;
      const newPayment = {
        id: txId,
        transactionId: txId,
        enrollmentId: newEnrollment.id,
        bookingId: newEnrollment.id,
        userName: gFullName,
        userEmail: gEmail,
        guardianPhone: gPhone,
        camperName: camperFullName,
        camperAge: parseInt(camperAge) || 8,
        programName: programTitle,
        programType: 'Program',
        category: track || 'Specialty Camp',
        programImage: programImage || 'assets/images/junior_robotics_python_coding.jpeg',
        selectedDate: sessionDate,
        selectedTime: '8:30 AM – 4:00 PM',
        scheduleDetails: `Program Enrollment: ${programTitle} (${sessionDate})`,
        amount: totalPaid,
        amountNumeric: totalAmountNum,
        paymentDate: todayFormatted,
        paymentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        paymentTimestamp: new Date().toISOString(),
        paymentMethod: 'Visa •••• 4242',
        paymentStatus: 'Paid',
        statusBadge: 'Paid in Full',
        nextPaymentDate: 'None (Paid in Full)'
      };
      if (typeof recordCentralizedPayment === 'function') {
        recordCentralizedPayment(newPayment);
      }

      if (window.showCampToast) {
        window.showCampToast(`Enrollment completed successfully for ${camperFullName}!`, 'success', 'Enrollment Confirmed');
      }

      // Redirect to success page
      setTimeout(() => {
        window.location.href = 'enrollment-success.html';
      }, 400);
    });

    // Initial setup
    showStep(1);
  }

  // ------------------------------------------------------------------------
  // 2. Camp Matcher Quiz
  // ------------------------------------------------------------------------
  const quizForm = document.getElementById('campMatchQuizForm');
  if (quizForm) {
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizPrevBtn = document.getElementById('quizPrevBtn');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizSubmitBtn = document.getElementById('quizSubmitBtn');
    const quizResults = document.getElementById('campMatchResults');
    let quizCurrent = 1;
    const quizTotal = quizSteps.length;

    function showQuizStep(step) {
      quizSteps.forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 === step);
      });
      if (quizPrevBtn) quizPrevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
      if (quizNextBtn) quizNextBtn.style.display = step === quizTotal ? 'none' : 'inline-flex';
      if (quizSubmitBtn) quizSubmitBtn.style.display = step === quizTotal ? 'inline-flex' : 'none';
    }

    if (quizNextBtn) {
      quizNextBtn.addEventListener('click', () => {
        if (quizCurrent < quizTotal) {
          quizCurrent++;
          showQuizStep(quizCurrent);
        }
      });
    }

    if (quizPrevBtn) {
      quizPrevBtn.addEventListener('click', () => {
        if (quizCurrent > 1) {
          quizCurrent--;
          showQuizStep(quizCurrent);
        }
      });
    }

    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ageChoice = document.querySelector('input[name="quizAge"]:checked')?.value || 'junior';
      const activityChoice = document.querySelector('input[name="quizInterest"]:checked')?.value || 'stem';

      // Hide quiz form & show results
      quizForm.style.display = 'none';
      if (quizResults) {
        quizResults.style.display = 'block';
        quizResults.scrollIntoView({ behavior: 'smooth' });
      }

      if (window.showCampToast) {
        window.showCampToast('We found 3 perfect camps matching your criteria!', 'success', 'Matches Found!');
      }
    });

    showQuizStep(1);
  }

  // ------------------------------------------------------------------------
  // 3. Contact Form Simulation
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('campContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Parent';
      if (window.showCampToast) {
        window.showCampToast(`Thank you, ${name}! Your inquiry has been sent to our Camp Director. We'll reply within 24 hours.`, 'success', 'Message Sent');
      }
      contactForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 4. Multi-User Authentication Database, Registration & Login
  // ------------------------------------------------------------------------
  function getRegisteredUsers() {
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }
    if (!users || users.length === 0) {
      users = [
        {
          id: 'usr_demo_parent',
          firstName: 'Sarah',
          lastName: 'Watson',
          name: 'Sarah Watson',
          email: 'parent@campsphere.com',
          phone: '(555) 019-2834',
          password: 'parent12345',
          address: '4288 Meadow Pine Way, South Lake Tahoe, CA 96150',
          pickupPin: '8492',
          registeredAt: '2026-05-01T08:00:00.000Z',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80'
        }
      ];
      localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
    }
    return users;
  }

  function saveRegisteredUsers(users) {
    localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
  }

  // Password Visibility Toggle for Login & Register forms
  document.querySelectorAll('.btn-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
          }
        }
      }
    });
  });

  // 4.1 Parent Registration Form Handler
  const registerForm = document.getElementById('campRegisterForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstNameInput = document.getElementById('registerFirstName');
      const lastNameInput = document.getElementById('registerLastName');
      const emailInput = document.getElementById('registerEmail');
      const phoneInput = document.getElementById('registerPhone');
      const passwordInput = document.getElementById('registerPassword');
      const confirmPasswordInput = document.getElementById('registerConfirmPassword');
      const termsAgreeInput = document.getElementById('termsAgree');
      const submitBtn = document.getElementById('registerSubmitBtn');

      const firstName = firstNameInput ? firstNameInput.value.trim() : '';
      const lastName = lastNameInput ? lastNameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

      // Reset validation states
      [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(el => {
        if (el) el.classList.remove('is-invalid');
      });

      if (!firstName || !lastName || !email || !phone || !password) {
        if (window.showCampToast) {
          window.showCampToast('Please fill in all required registration fields.', 'error', 'Registration Incomplete');
        }
        return;
      }

      if (password.length < 6) {
        if (passwordInput) passwordInput.classList.add('is-invalid');
        if (window.showCampToast) {
          window.showCampToast('Password must be at least 6 characters long.', 'error', 'Invalid Password');
        }
        return;
      }

      if (password !== confirmPassword) {
        if (confirmPasswordInput) confirmPasswordInput.classList.add('is-invalid');
        if (window.showCampToast) {
          window.showCampToast('Passwords do not match. Please re-enter your password.', 'error', 'Password Mismatch');
        }
        return;
      }

      if (termsAgreeInput && !termsAgreeInput.checked) {
        if (window.showCampToast) {
          window.showCampToast('Please agree to the CampSphere Terms and Privacy Policy.', 'warning', 'Terms Required');
        }
        return;
      }

      const users = getRegisteredUsers();
      const existingUserIndex = users.findIndex(u => u.email && u.email.toLowerCase() === email);

      // Create or update user account (allows same email to be registered/updated)
      const fullName = `${firstName} ${lastName}`.trim();
      const userId = existingUserIndex !== -1 ? users[existingUserIndex].id : ('usr_' + Date.now());

      const newUser = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        name: fullName,
        email: email,
        phone: phone,
        password: password,
        address: '1204 Pine Vista Drive, Tahoe City, CA 96145',
        pickupPin: String(Math.floor(1000 + Math.random() * 9000)),
        registeredAt: new Date().toISOString(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
        children: existingUserIndex !== -1 ? (users[existingUserIndex].children || []) : [],
        enrollments: existingUserIndex !== -1 ? (users[existingUserIndex].enrollments || []) : []
      };

      if (existingUserIndex !== -1) {
        users[existingUserIndex] = newUser;
      } else {
        users.push(newUser);
      }
      saveRegisteredUsers(users);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Account Created! Redirecting...`;
      }

      // Store prefill email and success toast for the Login page
      sessionStorage.setItem('campsphere_prefill_login_email', email);
      sessionStorage.setItem('campsphere_login_toast', `Account registered for ${fullName}! Please enter your password to sign in.`);

      if (window.showCampToast) {
        window.showCampToast(`Account created for ${fullName}! Redirecting to login page...`, 'success', 'Registration Successful');
      }

      // Automatically redirect to the Login page
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 700);
    });
  }

  // 4.2 Login Form Handler
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  const appleLoginBtn = document.getElementById('appleLoginBtn');
  const loginEmailInput = document.getElementById('loginEmail');
  const loginPasswordInput = document.getElementById('loginPassword');

  // Check if registration success toast or email was queued for login
  if (loginEmailInput) {
    const loginToast = sessionStorage.getItem('campsphere_login_toast');
    if (loginToast) {
      sessionStorage.removeItem('campsphere_login_toast');
      if (window.showCampToast) {
        setTimeout(() => {
          window.showCampToast(loginToast, 'success', 'Account Ready');
        }, 300);
      }
    }

    const prefilledEmail = sessionStorage.getItem('campsphere_prefill_login_email');
    if (prefilledEmail) {
      loginEmailInput.value = prefilledEmail;
      if (loginPasswordInput) {
        loginPasswordInput.value = '';
        loginPasswordInput.focus();
      }
      sessionStorage.removeItem('campsphere_prefill_login_email');
    }
  }

  const loginForm = document.getElementById('campLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = loginEmailInput ? loginEmailInput.value.trim().toLowerCase() : '';
      const password = loginPasswordInput ? loginPasswordInput.value : '';

      if (loginEmailInput) loginEmailInput.classList.remove('is-invalid');
      if (loginPasswordInput) loginPasswordInput.classList.remove('is-invalid');

      if (!email || !password) {
        if (window.showCampToast) {
          window.showCampToast('Please enter both your registered email and password.', 'error', 'Missing Credentials');
        }
        return;
      }

      const users = getRegisteredUsers();
      const matchedUser = users.find(u => u.email && u.email.toLowerCase() === email);

      // Authenticate: must match a registered account and password
      if (!matchedUser || matchedUser.password !== password) {
        if (loginEmailInput) loginEmailInput.classList.add('is-invalid');
        if (loginPasswordInput) loginPasswordInput.classList.add('is-invalid');
        if (window.showCampToast) {
          window.showCampToast('Invalid email or password. Please check your credentials and try again.', 'error', 'Invalid Credentials');
        }
        return;
      }

      // Valid Credentials: create active user session
      const resolvedName = matchedUser.name || `${matchedUser.firstName || ''} ${matchedUser.lastName || ''}`.trim() || 'Parent User';
      const resolvedFirstName = matchedUser.firstName || resolvedName.split(' ')[0] || 'Parent';
      const resolvedLastName = matchedUser.lastName || (resolvedName.split(' ').length > 1 ? resolvedName.split(' ').slice(1).join(' ') : '');

      const userSession = {
        loggedIn: true,
        id: matchedUser.id,
        name: resolvedName,
        firstName: resolvedFirstName,
        lastName: resolvedLastName,
        email: matchedUser.email,
        phone: matchedUser.phone || '',
        role: 'parent',
        avatar: matchedUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('campsphere_user_session', JSON.stringify(userSession));
      localStorage.setItem('campsphere_active_user_id', matchedUser.id);
      sessionStorage.setItem('campsphere_welcome_toast', `Welcome back, ${userSession.name}! You are now signed in.`);

      // Redirect directly to the Home Page
      window.location.href = 'index.html';
    });
  }

  // 4.3 Google Authentication Modal Trigger & Form Handler
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalEl = document.getElementById('googleAuthModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.show();
      }
    });
  }

  const googleAuthForm = document.getElementById('googleAuthForm');
  if (googleAuthForm) {
    googleAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('googleUserNameInput');
      const emailInput = document.getElementById('googleUserEmailInput');
      const confirmBtn = document.getElementById('googleConfirmBtn');

      const name = nameInput ? nameInput.value.trim() : 'Google User';
      const email = emailInput ? emailInput.value.trim().toLowerCase() : 'user@gmail.com';

      if (!name || !email) {
        if (window.showCampToast) {
          window.showCampToast('Please enter your Google account name and Gmail address.', 'danger', 'Google Auth Error');
        }
        return;
      }

      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Connecting to Google...`;
      }

      setTimeout(() => {
        const users = getRegisteredUsers();
        let user = users.find(u => u.email && u.email.toLowerCase() === email);
        if (!user) {
          user = {
            id: 'usr_g_' + Date.now(),
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            name: name,
            email: email,
            phone: '(555) 019-2834',
            authProvider: 'Google',
            address: 'Tahoe City, CA',
            pickupPin: String(Math.floor(1000 + Math.random() * 9000)),
            registeredAt: new Date().toISOString(),
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
            children: [],
            enrollments: []
          };
          users.push(user);
          saveRegisteredUsers(users);
        }

        const googleSession = {
          loggedIn: true,
          id: user.id,
          name: name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: email,
          phone: user.phone,
          role: 'parent',
          authProvider: 'Google',
          avatar: user.avatar,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('campsphere_user_session', JSON.stringify(googleSession));
        localStorage.setItem('campsphere_active_user_id', user.id);
        sessionStorage.setItem('campsphere_welcome_toast', `Welcome, ${name}! Logged in with Google.`);

        // Close modal
        const modalEl = document.getElementById('googleAuthModal');
        if (modalEl && typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        }

        window.location.href = 'index.html';
      }, 700);
    });

    document.getElementById('googleCancelBtn')?.addEventListener('click', () => {
      if (window.showCampToast) {
        window.showCampToast('Google sign-in attempt was cancelled.', 'warning', 'Authentication Cancelled');
      }
    });
    document.getElementById('googleAuthCloseBtn')?.addEventListener('click', () => {
      if (window.showCampToast) {
        window.showCampToast('Google sign-in attempt was cancelled.', 'warning', 'Authentication Cancelled');
      }
    });
  }

  // 4.4 Apple ID Authentication Modal Trigger & Form Handler
  if (appleLoginBtn) {
    appleLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalEl = document.getElementById('appleAuthModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.show();
      }
    });
  }

  const appleAuthForm = document.getElementById('appleAuthForm');
  if (appleAuthForm) {
    appleAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('appleUserNameInput');
      const emailInput = document.getElementById('appleUserEmailInput');
      const hideEmailRadio = document.getElementById('appleHideEmail');
      const confirmBtn = document.getElementById('appleConfirmBtn');

      const name = nameInput ? nameInput.value.trim() : 'Apple User';
      let email = emailInput ? emailInput.value.trim().toLowerCase() : 'user@icloud.com';

      if (!name || !email) {
        if (window.showCampToast) {
          window.showCampToast('Please enter your Apple account name and Apple ID email.', 'danger', 'Apple Auth Error');
        }
        return;
      }

      if (hideEmailRadio && hideEmailRadio.checked) {
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        email = `${cleanName || 'camper'}.parent@privaterelay.appleid.com`;
      }

      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authenticating Apple ID...`;
      }

      setTimeout(() => {
        const users = getRegisteredUsers();
        let user = users.find(u => u.email && u.email.toLowerCase() === email);
        if (!user) {
          user = {
            id: 'usr_a_' + Date.now(),
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            name: name,
            email: email,
            phone: '(555) 019-2834',
            authProvider: 'Apple',
            address: 'Tahoe City, CA',
            pickupPin: String(Math.floor(1000 + Math.random() * 9000)),
            registeredAt: new Date().toISOString(),
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
            children: [],
            enrollments: []
          };
          users.push(user);
          saveRegisteredUsers(users);
        }

        const appleSession = {
          loggedIn: true,
          id: user.id,
          name: name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: email,
          phone: user.phone,
          role: 'parent',
          authProvider: 'Apple',
          avatar: user.avatar,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('campsphere_user_session', JSON.stringify(appleSession));
        localStorage.setItem('campsphere_active_user_id', user.id);
        sessionStorage.setItem('campsphere_welcome_toast', `Welcome, ${name}! Logged in with Apple ID.`);

        // Close modal
        const modalEl = document.getElementById('appleAuthModal');
        if (modalEl && typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        }

        window.location.href = 'index.html';
      }, 700);
    });

    document.getElementById('appleCancelBtn')?.addEventListener('click', () => {
      if (window.showCampToast) {
        window.showCampToast('Apple sign-in attempt was cancelled.', 'warning', 'Authentication Cancelled');
      }
    });
    document.getElementById('appleAuthCloseBtn')?.addEventListener('click', () => {
      if (window.showCampToast) {
        window.showCampToast('Apple sign-in attempt was cancelled.', 'warning', 'Authentication Cancelled');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Add Child Modal Handling
  // ------------------------------------------------------------------------
  const addChildForm = document.getElementById('addChildForm');
  if (addChildForm) {
    addChildForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newChildName')?.value || 'New Camper';
      const age = document.getElementById('newChildAge')?.value || '7';
      const allergies = document.getElementById('newChildAllergies')?.value || 'None';

      const newChild = { name, age, allergies, id: 'CH-' + Date.now() };
      const children = JSON.parse(localStorage.getItem('campsphere_children') || '[]');
      children.push(newChild);
      localStorage.setItem('campsphere_children', JSON.stringify(children));

      if (window.showCampToast) {
        window.showCampToast(`${name} has been added to your camper profile!`, 'success', 'Camper Added');
      }

      // Close modal if bootstrap is available
      const modalEl = document.getElementById('addChildModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
      }

      // Reload list if in children page
      setTimeout(() => location.reload(), 1000);
    });
  }

  // ------------------------------------------------------------------------
  // 6. Daily Schedule Payment Form Handling & Validation
  // ------------------------------------------------------------------------
  const dailyPaymentForm = document.getElementById('dailySchedulePaymentForm');
  if (dailyPaymentForm) {
    const dailyPassSelect = document.getElementById('dailyPassSelect');
    const dailyDateInput = document.getElementById('dailyDateInput');
    const dailyCamperFirst = document.getElementById('camperFirstName');
    const dailyCamperLast = document.getElementById('camperLastName');
    const dailyCamperAge = document.getElementById('camperAge');
    const dailyGuardianName = document.getElementById('guardianName');
    const dailyGuardianEmail = document.getElementById('guardianEmail');
    const dailyGuardianPhone = document.getElementById('guardianPhone');
    const dailyCardNumber = document.getElementById('cardNumber');
    const dailyCardExpiry = document.getElementById('cardExpiry');
    const dailyCardCvc = document.getElementById('cardCvc');

    const dailyInputs = [dailyPassSelect, dailyDateInput, dailyCamperFirst, dailyCamperLast, dailyCamperAge, dailyGuardianName, dailyGuardianEmail, dailyGuardianPhone, dailyCardNumber, dailyCardExpiry, dailyCardCvc];
    dailyInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', () => input.classList.remove('is-invalid'));
        input.addEventListener('change', () => input.classList.remove('is-invalid'));
      }
    });

    dailyPaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      let firstInvalid = null;

      function checkField(input, isErr) {
        if (!input) return;
        if (isErr) {
          input.classList.add('is-invalid');
          isValid = false;
          if (!firstInvalid) firstInvalid = input;
        } else {
          input.classList.remove('is-invalid');
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

      checkField(dailyPassSelect, !dailyPassSelect || !dailyPassSelect.value);
      checkField(dailyDateInput, !dailyDateInput || !dailyDateInput.value);
      checkField(dailyCamperFirst, !dailyCamperFirst || !dailyCamperFirst.value.trim());
      checkField(dailyCamperLast, !dailyCamperLast || !dailyCamperLast.value.trim());
      checkField(dailyCamperAge, !dailyCamperAge || !dailyCamperAge.value);
      checkField(dailyGuardianName, !dailyGuardianName || !dailyGuardianName.value.trim());
      checkField(dailyGuardianEmail, !dailyGuardianEmail || !dailyGuardianEmail.value.trim() || !emailRegex.test(dailyGuardianEmail.value.trim()));
      checkField(dailyGuardianPhone, !dailyGuardianPhone || dailyGuardianPhone.value.replace(/\D/g, '').length < 7);
      
      if (dailyCardNumber) {
        const rawCard = dailyCardNumber.value.replace(/[\s-]/g, '');
        checkField(dailyCardNumber, rawCard.length < 13 || isNaN(rawCard));
      }
      if (dailyCardExpiry) {
        checkField(dailyCardExpiry, !expiryRegex.test(dailyCardExpiry.value.trim()));
      }
      if (dailyCardCvc) {
        const rawCvc = dailyCardCvc.value.trim();
        checkField(dailyCardCvc, rawCvc.length < 3 || rawCvc.length > 4 || isNaN(rawCvc));
      }

      if (!isValid) {
        if (window.showCampToast) {
          window.showCampToast('Please fill in all required booking form fields highlighted in red.', 'danger', 'Required Fields Missing');
        }
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
      }
      
      const opt = dailyPassSelect.options[dailyPassSelect.selectedIndex];
      const passId = dailyPassSelect.value || 'daily-2';
      const passTitle = opt ? (opt.getAttribute('data-title') || opt.text) : 'STEM & Robotics Single Day';
      const passTime = opt ? (opt.getAttribute('data-time') || '8:30 AM – 4:00 PM') : '8:30 AM – 4:00 PM';
      
      let actDate = 'June 16, 2026';
      if (dailyDateInput && dailyDateInput.value) {
        const d = new Date(dailyDateInput.value + 'T00:00:00');
        actDate = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      }

      const camperFirst = dailyCamperFirst.value.trim();
      const camperLast = dailyCamperLast.value.trim();
      const camperAge = dailyCamperAge.value;
      const camperFullName = `${camperFirst} ${camperLast}`.trim();

      const guardianName = dailyGuardianName.value.trim();
      const guardianEmail = dailyGuardianEmail.value.trim();
      const guardianPhone = dailyGuardianPhone.value.trim();
      const totalAmount = document.getElementById('summaryTotalAmount')?.textContent || '$95.00';

      const bookingId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
      const txId = 'TXN-DS-' + Math.floor(100000 + Math.random() * 900000);
      const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const newDailyBooking = {
        id: bookingId,
        transactionId: txId,
        type: 'Daily Schedule',
        passId: passId,
        scheduleTitle: passTitle,
        activityDate: actDate,
        timeSlot: passTime,
        camperName: camperFullName,
        camperAge: parseInt(camperAge, 10) || 8,
        guardianName: guardianName,
        guardianEmail: guardianEmail,
        guardianPhone: guardianPhone,
        amount: totalAmount,
        paymentStatus: 'Paid in Full',
        status: 'Confirmed',
        bookingDate: todayFormatted
      };

      // Save to active user in registered users
      let users = [];
      try { users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]'); } catch (err) {}
      let session = null;
      try { session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null'); } catch (err) {}

      if (session && session.loggedIn) {
        const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
        if (activeUser) {
          if (!activeUser.dailySchedules) activeUser.dailySchedules = [];
          activeUser.dailySchedules.unshift(newDailyBooking);
          localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
        }
      }

      // Save to general daily list
      let dailyList = [];
      try { dailyList = JSON.parse(localStorage.getItem('campsphere_daily_schedules') || '[]'); } catch (err) {}
      dailyList.unshift(newDailyBooking);
      localStorage.setItem('campsphere_daily_schedules', JSON.stringify(dailyList));
      localStorage.setItem('campsphere_latest_daily_booking', JSON.stringify(newDailyBooking));

      // Save to centralized payment records
      const newDailyPayment = {
        id: txId,
        transactionId: txId,
        enrollmentId: bookingId,
        bookingId: bookingId,
        userName: guardianName,
        userEmail: guardianEmail,
        guardianPhone: guardianPhone,
        camperName: camperFullName,
        camperAge: parseInt(camperAge, 10) || 8,
        programName: passTitle,
        programType: 'Daily Schedule',
        category: 'Daily Pass',
        programImage: 'assets/images/outdoor_adventure_camp.jpeg',
        selectedDate: actDate,
        selectedTime: passTime,
        scheduleDetails: `Daily Schedule Pass: ${passTitle} on ${actDate}`,
        amount: totalAmount,
        amountNumeric: parseFloat(totalAmount.replace(/[^0-9.]/g, '')) || 95,
        paymentDate: todayFormatted,
        paymentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        paymentTimestamp: new Date().toISOString(),
        paymentMethod: 'Visa •••• 4242',
        paymentStatus: 'Paid',
        statusBadge: 'Paid in Full',
        nextPaymentDate: 'None (Paid in Full)'
      };
      recordCentralizedPayment(newDailyPayment);

      // 1. Show Professional Toast Notification
      if (window.showCampToast) {
        window.showCampToast(
          `Daily Schedule Pass for ${camperFullName} (${passTitle} on ${actDate}) confirmed! Order Reference: ${txId}`,
          'success',
          'Order Booked Successfully'
        );
      }

      // 2. Render In-Page Alert Banner (Stay on current page)
      const alertContainer = document.getElementById('bookingSuccessAlertContainer');
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show shadow-sm border-2 border-success p-4 rounded-4" role="alert">
            <div class="d-flex align-items-start gap-3">
              <div class="rounded-circle bg-success text-white p-2 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 44px; height: 44px;">
                <i class="bi bi-check-lg fs-4"></i>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                  <h5 class="alert-heading fw-bold text-navy mb-0">Order Booked Successfully!</h5>
                  <span class="badge bg-success text-white px-3 py-1 rounded-pill"><i class="bi bi-shield-check me-1"></i> Status: Confirmed & Paid in Full</span>
                </div>
                <p class="mb-2 text-navy">
                  Your <strong>Daily Schedule</strong> order has been confirmed and saved to your account.
                </p>
                <div class="p-3 bg-white bg-opacity-75 rounded-3 border mb-3 small text-navy">
                  <div class="row g-2">
                    <div class="col-sm-6"><strong>Order / Transaction ID:</strong> <span class="font-monospace text-primary fw-bold">${txId}</span></div>
                    <div class="col-sm-6"><strong>Booking Type:</strong> Daily Schedule Pass</div>
                    <div class="col-sm-6"><strong>Camper:</strong> ${camperFullName} (Age ${camperAge})</div>
                    <div class="col-sm-6"><strong>Schedule Pass:</strong> ${passTitle}</div>
                    <div class="col-sm-6"><strong>Attendance Date:</strong> ${actDate} (${passTime})</div>
                    <div class="col-sm-6"><strong>Amount Paid:</strong> <span class="text-success fw-bold">${totalAmount}</span></div>
                  </div>
                </div>
                <div class="d-flex flex-wrap align-items-center gap-2">
                  <a href="parent/dashboard.html#dailyScheduleSection" class="btn btn-sm btn-success fw-bold">
                    <i class="bi bi-speedometer2 me-1"></i> View in User Dashboard
                  </a>
                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('bookingSuccessAlertContainer').style.display='none';">
                    Close Alert
                  </button>
                </div>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        `;
        alertContainer.style.display = 'block';
        alertContainer.style.opacity = '1';
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Auto-dismiss alert after 10 seconds
        setTimeout(() => {
          if (alertContainer && alertContainer.style.display !== 'none') {
            alertContainer.style.transition = 'opacity 0.5s ease';
            alertContainer.style.opacity = '0';
            setTimeout(() => {
              alertContainer.style.display = 'none';
              alertContainer.style.opacity = '1';
            }, 500);
          }
        }, 10000);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. Weekly Schedule Payment Form Handling & Validation
  // ------------------------------------------------------------------------
  const weeklyPaymentForm = document.getElementById('weeklySchedulePaymentForm');
  if (weeklyPaymentForm) {
    const weekSelect = document.getElementById('weeklySessionSelect');
    const weeklyCamperFirst = document.getElementById('weeklyCamperFirstName');
    const weeklyCamperLast = document.getElementById('weeklyCamperLastName');
    const weeklyCamperAge = document.getElementById('weeklyCamperAge');
    const weeklyGuardianName = document.getElementById('weeklyGuardianName');
    const weeklyGuardianEmail = document.getElementById('weeklyGuardianEmail');
    const weeklyGuardianPhone = document.getElementById('weeklyGuardianPhone');
    const weeklyCardNumber = document.getElementById('weeklyCardNumber');
    const weeklyCardExpiry = document.getElementById('weeklyCardExpiry');
    const weeklyCardCvc = document.getElementById('weeklyCardCvc');

    const weeklyInputs = [weekSelect, weeklyCamperFirst, weeklyCamperLast, weeklyCamperAge, weeklyGuardianName, weeklyGuardianEmail, weeklyGuardianPhone, weeklyCardNumber, weeklyCardExpiry, weeklyCardCvc];
    weeklyInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', () => input.classList.remove('is-invalid'));
        input.addEventListener('change', () => input.classList.remove('is-invalid'));
      }
    });

    weeklyPaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      let firstInvalid = null;

      function checkField(input, isErr) {
        if (!input) return;
        if (isErr) {
          input.classList.add('is-invalid');
          isValid = false;
          if (!firstInvalid) firstInvalid = input;
        } else {
          input.classList.remove('is-invalid');
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

      checkField(weekSelect, !weekSelect || !weekSelect.value);
      checkField(weeklyCamperFirst, !weeklyCamperFirst || !weeklyCamperFirst.value.trim());
      checkField(weeklyCamperLast, !weeklyCamperLast || !weeklyCamperLast.value.trim());
      checkField(weeklyCamperAge, !weeklyCamperAge || !weeklyCamperAge.value);
      checkField(weeklyGuardianName, !weeklyGuardianName || !weeklyGuardianName.value.trim());
      checkField(weeklyGuardianEmail, !weeklyGuardianEmail || !weeklyGuardianEmail.value.trim() || !emailRegex.test(weeklyGuardianEmail.value.trim()));
      checkField(weeklyGuardianPhone, !weeklyGuardianPhone || weeklyGuardianPhone.value.replace(/\D/g, '').length < 7);
      
      if (weeklyCardNumber) {
        const rawCard = weeklyCardNumber.value.replace(/[\s-]/g, '');
        checkField(weeklyCardNumber, rawCard.length < 13 || isNaN(rawCard));
      }
      if (weeklyCardExpiry) {
        checkField(weeklyCardExpiry, !expiryRegex.test(weeklyCardExpiry.value.trim()));
      }
      if (weeklyCardCvc) {
        const rawCvc = weeklyCardCvc.value.trim();
        checkField(weeklyCardCvc, rawCvc.length < 3 || rawCvc.length > 4 || isNaN(rawCvc));
      }

      if (!isValid) {
        if (window.showCampToast) {
          window.showCampToast('Please fill in all required booking form fields highlighted in red.', 'danger', 'Required Fields Missing');
        }
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
      }
      
      const opt = weekSelect.options[weekSelect.selectedIndex];
      const weekId = weekSelect.value || 'week-1';
      const weekTheme = opt ? (opt.getAttribute('data-title') || opt.text) : 'Space & Robotics Odyssey';
      const weekBadge = opt ? (opt.getAttribute('data-week') || 'Week 1') : 'Week 1';
      const dateRange = opt ? (opt.getAttribute('data-dates') || 'June 15 – June 19, 2026') : 'June 15 – June 19, 2026';

      const camperFirst = weeklyCamperFirst.value.trim();
      const camperLast = weeklyCamperLast.value.trim();
      const camperAge = weeklyCamperAge.value;
      const camperFullName = `${camperFirst} ${camperLast}`.trim();

      const guardianName = weeklyGuardianName.value.trim();
      const guardianEmail = weeklyGuardianEmail.value.trim();
      const guardianPhone = weeklyGuardianPhone.value.trim();
      const totalAmount = document.getElementById('weeklySummaryTotalAmount')?.textContent || '$395.00';

      const bookingId = 'WS-' + Math.floor(100000 + Math.random() * 900000);
      const txId = 'TXN-WS-' + Math.floor(100000 + Math.random() * 900000);
      const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const newWeeklyBooking = {
        id: bookingId,
        transactionId: txId,
        type: 'Weekly Schedule',
        weekId: weekId,
        weekNumber: weekBadge,
        themeTitle: weekTheme,
        dateRange: dateRange,
        camperName: camperFullName,
        camperAge: parseInt(camperAge, 10) || 10,
        guardianName: guardianName,
        guardianEmail: guardianEmail,
        guardianPhone: guardianPhone,
        amount: totalAmount,
        paymentStatus: 'Paid in Full',
        status: 'Confirmed',
        bookingDate: todayFormatted
      };

      // Save to active user in registered users
      let users = [];
      try { users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]'); } catch (err) {}
      let session = null;
      try { session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null'); } catch (err) {}

      if (session && session.loggedIn) {
        const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
        if (activeUser) {
          if (!activeUser.weeklySchedules) activeUser.weeklySchedules = [];
          activeUser.weeklySchedules.unshift(newWeeklyBooking);
          localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
        }
      }

      // Save to general weekly list
      let weeklyList = [];
      try { weeklyList = JSON.parse(localStorage.getItem('campsphere_weekly_schedules') || '[]'); } catch (err) {}
      weeklyList.unshift(newWeeklyBooking);
      localStorage.setItem('campsphere_weekly_schedules', JSON.stringify(weeklyList));
      localStorage.setItem('campsphere_latest_weekly_booking', JSON.stringify(newWeeklyBooking));

      // Save to centralized payment records
      const newWeeklyPayment = {
        id: txId,
        transactionId: txId,
        enrollmentId: bookingId,
        bookingId: bookingId,
        userName: guardianName,
        userEmail: guardianEmail,
        guardianPhone: guardianPhone,
        camperName: camperFullName,
        camperAge: parseInt(camperAge, 10) || 10,
        programName: `${weekBadge}: ${weekTheme}`,
        programType: 'Weekly Schedule',
        category: 'Weekly Session',
        programImage: 'assets/images/junior_robotics_python_coding.jpeg',
        selectedDate: dateRange,
        selectedTime: '8:30 AM – 4:00 PM (Monday – Friday)',
        scheduleDetails: `Weekly Schedule Session: ${weekBadge} - ${weekTheme} (${dateRange})`,
        amount: totalAmount,
        amountNumeric: parseFloat(totalAmount.replace(/[^0-9.]/g, '')) || 395,
        paymentDate: todayFormatted,
        paymentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        paymentTimestamp: new Date().toISOString(),
        paymentMethod: 'Visa •••• 4242',
        paymentStatus: 'Paid',
        statusBadge: 'Paid in Full',
        nextPaymentDate: 'None (Paid in Full)'
      };
      recordCentralizedPayment(newWeeklyPayment);

      // 1. Show Professional Toast Notification
      if (window.showCampToast) {
        window.showCampToast(
          `Weekly Schedule Session (${weekBadge}: ${weekTheme}) for ${camperFullName} confirmed! Order Reference: ${txId}`,
          'success',
          'Order Booked Successfully'
        );
      }

      // 2. Render In-Page Alert Banner (Stay on current page)
      const alertContainer = document.getElementById('bookingSuccessAlertContainer');
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show shadow-sm border-2 border-success p-4 rounded-4" role="alert">
            <div class="d-flex align-items-start gap-3">
              <div class="rounded-circle bg-success text-white p-2 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 44px; height: 44px;">
                <i class="bi bi-check-lg fs-4"></i>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                  <h5 class="alert-heading fw-bold text-navy mb-0">Order Booked Successfully!</h5>
                  <span class="badge bg-success text-white px-3 py-1 rounded-pill"><i class="bi bi-shield-check me-1"></i> Status: Confirmed & Paid in Full</span>
                </div>
                <p class="mb-2 text-navy">
                  Your <strong>Weekly Schedule</strong> order has been confirmed and saved to your account.
                </p>
                <div class="p-3 bg-white bg-opacity-75 rounded-3 border mb-3 small text-navy">
                  <div class="row g-2">
                    <div class="col-sm-6"><strong>Order / Transaction ID:</strong> <span class="font-monospace text-primary fw-bold">${txId}</span></div>
                    <div class="col-sm-6"><strong>Booking Type:</strong> Weekly Schedule Session</div>
                    <div class="col-sm-6"><strong>Camper:</strong> ${camperFullName} (Age ${camperAge})</div>
                    <div class="col-sm-6"><strong>Session:</strong> ${weekBadge} - ${weekTheme}</div>
                    <div class="col-sm-6"><strong>Date Range:</strong> ${dateRange} (Monday – Friday)</div>
                    <div class="col-sm-6"><strong>Amount Paid:</strong> <span class="text-success fw-bold">${totalAmount}</span></div>
                  </div>
                </div>
                <div class="d-flex flex-wrap align-items-center gap-2">
                  <a href="parent/dashboard.html#weeklyScheduleSection" class="btn btn-sm btn-success fw-bold">
                    <i class="bi bi-speedometer2 me-1"></i> View in User Dashboard
                  </a>
                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('bookingSuccessAlertContainer').style.display='none';">
                    Close Alert
                  </button>
                </div>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        `;
        alertContainer.style.display = 'block';
        alertContainer.style.opacity = '1';
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Auto-dismiss alert after 10 seconds
        setTimeout(() => {
          if (alertContainer && alertContainer.style.display !== 'none') {
            alertContainer.style.transition = 'opacity 0.5s ease';
            alertContainer.style.opacity = '0';
            setTimeout(() => {
              alertContainer.style.display = 'none';
              alertContainer.style.opacity = '1';
            }, 500);
          }
        }, 10000);
      }
    });
  }
});

