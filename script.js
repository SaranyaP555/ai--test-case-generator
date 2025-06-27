let generatedTestCases = [];

// Loading screen animation
window.addEventListener('load', () => {
    const loadingTexts = [
        'Initializing AI Engine...',
        'Loading Test Patterns...',
        'Preparing Interface...',
        'Almost Ready...'
    ];
    
    let textIndex = 0;
    const loadingText = document.querySelector('.loading-text');
    
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingText.textContent = loadingTexts[textIndex];
    }, 700);
    
    setTimeout(() => {
        clearInterval(textInterval);
        document.getElementById('loading-screen').style.opacity = '0';
        document.querySelector('.container').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 6000);
});

document.getElementById('generate-btn').addEventListener('click', generateTestCases);

async function generateTestCases() {
    const prdInput = document.getElementById('prd-input').value.trim();
    const testType = document.getElementById('test-type').value;
    const testCount = parseInt(document.getElementById('test-count').value);

    if (!prdInput) {
        alert('Please paste your PRD before generating test cases.');
        return;
    }

    showLoading(true);
    
    // Simulate AI processing with realistic test case generation
    setTimeout(() => {
        generatedTestCases = createTestCases(prdInput, testType, testCount);
        displayTestCases(generatedTestCases);
        showLoading(false);
    }, 2000);
}

function createTestCases(prd, testType, count) {
    const testCases = [];
    const priorities = ['High', 'Medium', 'Low'];
    
    // Extract key features from PRD (simple keyword analysis)
    const keywords = prd.toLowerCase().split(/\s+/).filter(word => word.length > 4);
    const features = extractFeatures(prd);

    for (let i = 1; i <= count; i++) {
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const feature = features[i % features.length] || 'Feature';
        
        testCases.push({
            id: `TC_${testType.toUpperCase()}_${String(i).padStart(3, '0')}`,
            description: generateDescription(testType, feature, i),
            steps: generateSteps(testType, feature, i),
            priority: priority,
            expectedResults: generateExpectedResults(testType, feature, i)
        });
    }
    
    return testCases;
}

function extractFeatures(prd) {
    const commonFeatures = ['Login', 'Registration', 'Dashboard', 'Profile', 'Settings', 'Search', 'Filter', 'Export', 'Import', 'Notification', 'API', 'Endpoint', 'REST', 'Authentication', 'Request', 'Response', 'GET', 'POST', 'PUT', 'DELETE', 'JSON', 'Database', 'Integration'];
    const prdWords = prd.toLowerCase().split(/\s+/);
    const features = [];
    
    commonFeatures.forEach(feature => {
        if (prdWords.some(word => word.includes(feature.toLowerCase()))) {
            features.push(feature);
        }
    });
    
    // Add API-specific features if API testing is mentioned
    if (prdWords.some(word => word.includes('api') || word.includes('endpoint') || word.includes('rest'))) {
        if (!features.includes('API')) features.push('API');
        if (!features.includes('Endpoint')) features.push('Endpoint');
    }
    
    if (features.length === 0) {
        features.push('Main Feature', 'Core Functionality', 'User Interface', 'Data Processing');
    }
    
    return features;
}

function generateDescription(testType, feature, index) {
    const descriptions = {
        functional: [
            `Verify that ${feature} functionality works as expected`,
            `Test ${feature} with valid input data`,
            `Validate ${feature} error handling`,
            `Check ${feature} boundary conditions`,
            `Ensure ${feature} data validation`
        ],
        integration: [
            `Test integration between ${feature} and external services`,
            `Verify data flow in ${feature} module`,
            `Check API integration for ${feature}`,
            `Validate ${feature} database operations`,
            `Test ${feature} third-party integrations`
        ],
        regression: [
            `Verify ${feature} functionality after recent changes`,
            `Test backward compatibility of ${feature}`,
            `Ensure ${feature} existing features are intact`,
            `Validate ${feature} after bug fixes`,
            `Check ${feature} performance regression`
        ],
        smoke: [
            `Basic functionality test for ${feature}`,
            `Critical path verification for ${feature}`,
            `Core ${feature} availability check`,
            `Essential ${feature} workflow test`,
            `Quick ${feature} sanity check`
        ],
        acceptance: [
            `Verify ${feature} meets business requirements`,
            `Validate ${feature} user acceptance criteria`,
            `Test ${feature} end-to-end workflow`,
            `Check ${feature} usability requirements`,
            `Ensure ${feature} meets user expectations`
        ],
        performance: [
            `Test ${feature} response time`,
            `Verify ${feature} load handling capacity`,
            `Check ${feature} resource usage`,
            `Validate ${feature} scalability`,
            `Test ${feature} concurrent user handling`
        ],
        security: [
            `Test ${feature} authentication mechanisms`,
            `Verify ${feature} authorization controls`,
            `Check ${feature} data encryption`,
            `Validate ${feature} input sanitization`,
            `Test ${feature} vulnerability assessment`
        ],
        usability: [
            `Test ${feature} user interface intuitiveness`,
            `Verify ${feature} accessibility compliance`,
            `Check ${feature} navigation flow`,
            `Validate ${feature} error messages clarity`,
            `Test ${feature} help documentation`
        ],
        api: [
            `Test ${feature} API endpoint with valid request`,
            `Verify ${feature} API response status codes`,
            `Validate ${feature} API response payload structure`,
            `Test ${feature} API authentication and authorization`,
            `Check ${feature} API rate limiting and throttling`,
            `Verify ${feature} API error handling`,
            `Test ${feature} API with invalid parameters`,
            `Validate ${feature} API response time performance`
        ]
    };
    
    const typeDescriptions = descriptions[testType] || descriptions.functional;
    return typeDescriptions[index % typeDescriptions.length];
}

function generateSteps(testType, feature, index) {
    if (testType === 'api') {
        const apiStepTemplates = [
            [
                `1. Set up API endpoint URL for ${feature}`,
                `2. Configure request headers (Content-Type, Authorization)`,
                `3. Send GET/POST/PUT/DELETE request with test data`,
                `4. Verify response status code (200, 201, 400, etc.)`,
                `5. Validate response body structure and data types`,
                `6. Check response time is within acceptable limits`
            ],
            [
                `1. Prepare API test environment for ${feature}`,
                `2. Generate authentication token/API key`,
                `3. Construct request payload with test parameters`,
                `4. Execute API call using testing tool (Postman/REST client)`,
                `5. Assert response matches expected schema`,
                `6. Verify error messages for invalid requests`
            ],
            [
                `1. Define ${feature} API endpoint and method`,
                `2. Set up request with required parameters`,
                `3. Include necessary authentication credentials`,
                `4. Send request and capture response`,
                `5. Validate response headers and metadata`,
                `6. Confirm data integrity and consistency`
            ],
            [
                `1. Configure API testing framework for ${feature}`,
                `2. Create test data set for various scenarios`,
                `3. Execute API request with boundary values`,
                `4. Monitor API response time and performance`,
                `5. Verify response complies with API documentation`,
                `6. Test API versioning and backward compatibility`
            ],
            [
                `1. Access ${feature} API documentation`,
                `2. Identify required and optional parameters`,
                `3. Test with valid, invalid, and edge case inputs`,
                `4. Verify HTTP status codes for each scenario`,
                `5. Check response format (JSON/XML) consistency`,
                `6. Validate pagination and filtering functionality`
            ]
        ];
        return apiStepTemplates[index % apiStepTemplates.length].join('\n');
    }
    
    const stepTemplates = [
        [
            `1. Navigate to ${feature} page`,
            `2. Enter valid test data`,
            `3. Click on submit button`,
            `4. Verify the response`
        ],
        [
            `1. Access ${feature} module`,
            `2. Perform the required action`,
            `3. Check system response`,
            `4. Validate output data`
        ],
        [
            `1. Open ${feature} section`,
            `2. Input test parameters`,
            `3. Execute the operation`,
            `4. Verify expected behavior`
        ],
        [
            `1. Login to the application`,
            `2. Go to ${feature} functionality`,
            `3. Perform test scenario`,
            `4. Check results against criteria`
        ],
        [
            `1. Launch the application`,
            `2. Navigate to ${feature}`,
            `3. Execute test case steps`,
            `4. Document observations`
        ]
    ];
    
    return stepTemplates[index % stepTemplates.length].join('\n');
}

function generateExpectedResults(testType, feature, index) {
    const results = {
        functional: [
            `${feature} should function correctly with valid inputs`,
            `System should display success message`,
            `Data should be saved/processed correctly`,
            `All validations should work as expected`,
            `User should be redirected to appropriate page`
        ],
        integration: [
            `Data should flow correctly between systems`,
            `API should return expected response`,
            `Integration points should work seamlessly`,
            `No data loss during transmission`,
            `All systems should remain synchronized`
        ],
        regression: [
            `Existing functionality should work as before`,
            `No new bugs introduced`,
            `Performance should not degrade`,
            `All features should remain stable`,
            `Backward compatibility maintained`
        ],
        smoke: [
            `Basic functionality should be operational`,
            `Critical features should be accessible`,
            `No system crashes or errors`,
            `Core workflows should complete`,
            `Application should be stable`
        ],
        acceptance: [
            `Feature meets business requirements`,
            `User can complete intended tasks`,
            `Acceptance criteria satisfied`,
            `Business value delivered`,
            `User experience is satisfactory`
        ],
        performance: [
            `Response time within acceptable limits`,
            `System handles expected load`,
            `Resource usage is optimal`,
            `No performance bottlenecks`,
            `Scalability requirements met`
        ],
        security: [
            `Only authorized access allowed`,
            `Data properly encrypted`,
            `No security vulnerabilities`,
            `Input validation prevents attacks`,
            `Security standards compliance`
        ],
        usability: [
            `Interface is intuitive and user-friendly`,
            `Accessibility standards met`,
            `Navigation is logical and clear`,
            `Error messages are helpful`,
            `User can complete tasks easily`
        ],
        api: [
            `API returns correct HTTP status code (200 OK for success)`,
            `Response payload contains all required fields`,
            `Response data types match API specification`,
            `Response time is under 2 seconds for standard requests`,
            `Authentication/Authorization works correctly`,
            `Error responses include meaningful error messages and codes`,
            `API handles malformed requests gracefully`,
            `Response headers include proper content-type and metadata`,
            `Pagination works correctly with proper limit/offset`,
            `API rate limiting functions as documented`
        ]
    };
    
    const typeResults = results[testType] || results.functional;
    return typeResults[index % typeResults.length];
}

function displayTestCases(testCases) {
    const tbody = document.getElementById('test-cases-body');
    tbody.innerHTML = '';
    
    testCases.forEach((tc, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index;
        row.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="row-checkbox" onchange="updateBulkActionButtons()">
            </td>
            <td contenteditable="true">${tc.id}</td>
            <td contenteditable="true">${tc.description}</td>
            <td contenteditable="true" style="white-space: pre-line;">${tc.steps}</td>
            <td contenteditable="true" class="priority-${tc.priority.toLowerCase()}">${tc.priority}</td>
            <td contenteditable="true">${tc.expectedResults}</td>
            <td>
                <textarea class="actual-results" placeholder="Enter actual results..." data-index="${index}"></textarea>
            </td>
            <td>
                <select class="status-select status-pending" data-index="${index}" onchange="updateStatus(this)">
                    <option value="pending">Pending</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Initialize dashboard with correct values
    document.getElementById('total-tests').textContent = testCases.length;
    document.getElementById('passed-tests').textContent = '0';
    document.getElementById('failed-tests').textContent = '0';
    document.getElementById('pending-tests').textContent = testCases.length;
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    
    document.getElementById('results-section').classList.remove('hidden');
}

// Update status and recalculate statistics
function updateStatus(selectElement) {
    const status = selectElement.value;
    selectElement.className = `status-select status-${status}`;
    updateDashboard();
}

// Update dashboard statistics
function updateDashboard() {
    const statusSelects = document.querySelectorAll('.status-select');
    const total = statusSelects.length;
    let passed = 0;
    let failed = 0;
    let pending = 0;
    
    statusSelects.forEach(select => {
        switch(select.value) {
            case 'pass':
                passed++;
                break;
            case 'fail':
                failed++;
                break;
            case 'pending':
                pending++;
                break;
        }
    });
    
    // Animate count updates
    animateNumber('total-tests', total);
    animateNumber('passed-tests', passed);
    animateNumber('failed-tests', failed);
    animateNumber('pending-tests', pending);
    
    // Update progress bar
    const executed = passed + failed;
    const executionPercent = total > 0 ? Math.round((executed / total) * 100) : 0;
    const passPercent = total > 0 ? (passed / total) * 100 : 0;
    const failPercent = total > 0 ? (failed / total) * 100 : 0;
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    progressFill.style.width = executionPercent + '%';
    progressFill.style.setProperty('--pass-width', passPercent + '%');
    progressFill.style.setProperty('--fail-end', (passPercent + failPercent) + '%');
    progressText.textContent = executionPercent + '%';
}

// Animate number changes
function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    // Only animate if value has changed
    if (currentValue === newValue) return;
    
    // Clear any existing animation
    if (element.animationInterval) {
        clearInterval(element.animationInterval);
    }
    
    const duration = 500; // 500ms animation
    const steps = 20;
    const increment = (newValue - currentValue) / steps;
    let current = currentValue;
    let step = 0;
    
    element.animationInterval = setInterval(() => {
        step++;
        current = currentValue + (increment * step);
        
        if (step >= steps) {
            element.textContent = newValue;
            clearInterval(element.animationInterval);
            delete element.animationInterval;
        } else {
            element.textContent = Math.round(current);
        }
    }, duration / steps);
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    const generateBtn = document.getElementById('generate-btn');
    
    if (show) {
        loading.classList.remove('hidden');
        generateBtn.disabled = true;
    } else {
        loading.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

function getTableData() {
    const rows = document.querySelectorAll('#test-cases-body tr');
    const data = [];
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const actualResults = row.querySelector('.actual-results');
        const status = row.querySelector('.status-select');
        
        // Skip checkbox column (index 0) and start from index 1
        if (cells.length > 1) {
            data.push({
                'Test Case ID': cells[1].textContent.trim(),
                'Test Case Description': cells[2].textContent.trim(),
                'Test Steps': cells[3].textContent.trim(),
                'Priority': cells[4].textContent.trim(),
                'Expected Results': cells[5].textContent.trim(),
                'Actual Results': actualResults ? actualResults.value.trim() : '',
                'Status': status ? status.value.charAt(0).toUpperCase() + status.value.slice(1) : 'Pending'
            });
        }
    });
    
    return data;
}

function exportToExcel() {
    const data = getTableData();
    
    if (data.length === 0) {
        showNotification('No test cases to export!');
        return;
    }
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Cases");
    
    // Set proper column widths for all columns
    ws['!cols'] = [
        {width: 20}, // Test Case ID
        {width: 40}, // Test Case Description
        {width: 50}, // Test Steps
        {width: 12}, // Priority
        {width: 35}, // Expected Results
        {width: 35}, // Actual Results
        {width: 12}  // Status
    ];
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `test_cases_${timestamp}.xlsx`);
    showNotification('Test cases exported to Excel successfully!');
}

function exportToCSV() {
    const data = getTableData();
    
    if (data.length === 0) {
        showNotification('No test cases to export!');
        return;
    }
    
    const csv = convertToCSV(data);
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadFile(csv, `test_cases_${timestamp}.csv`, 'text/csv');
    showNotification('Test cases exported to CSV successfully!');
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
        return headers.map(header => {
            const value = row[header].replace(/"/g, '""');
            return `"${value}"`;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

function exportToPDF() {
    const data = getTableData();
    
    if (data.length === 0) {
        showNotification('No test cases to export!');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
    
    // Title
    doc.setFontSize(20);
    doc.text('Test Cases Report', 14, 15);
    
    // Get statistics
    const total = document.getElementById('total-tests').textContent;
    const passed = document.getElementById('passed-tests').textContent;
    const failed = document.getElementById('failed-tests').textContent;
    const pending = document.getElementById('pending-tests').textContent;
    
    // Report info
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
    doc.text(`Test Type: ${document.getElementById('test-type').selectedOptions[0].text}`, 14, 32);
    doc.text(`Total Test Cases: ${total}`, 14, 39);
    
    // Add execution summary
    doc.setFontSize(10);
    doc.setTextColor(0, 128, 0);
    doc.text(`Passed: ${passed}`, 100, 32);
    doc.setTextColor(255, 0, 0);
    doc.text(`Failed: ${failed}`, 130, 32);
    doc.setTextColor(255, 165, 0);
    doc.text(`Pending: ${pending}`, 160, 32);
    doc.setTextColor(0, 0, 0);
    
    // Prepare table data
    const headers = ['Test Case ID', 'Description', 'Test Steps', 'Priority', 'Expected Results', 'Actual Results', 'Status'];
    const rows = data.map(row => [
        row['Test Case ID'] || '',
        row['Test Case Description'] || '',
        row['Test Steps'] || '',
        row['Priority'] || '',
        row['Expected Results'] || '',
        row['Actual Results'] || '',
        row['Status'] || ''
    ]);
    
    // Add table with proper formatting
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 45,
        styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            cellWidth: 'wrap'
        },
        columnStyles: {
            0: { cellWidth: 25 },  // Test Case ID
            1: { cellWidth: 45 },  // Description
            2: { cellWidth: 55 },  // Test Steps
            3: { cellWidth: 20 },  // Priority
            4: { cellWidth: 45 },  // Expected Results
            5: { cellWidth: 45 },  // Actual Results
            6: { cellWidth: 20 }   // Status
        },
        headStyles: {
            fillColor: [102, 126, 234],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        margin: { top: 45 }
    });
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    doc.save(`test_cases_${timestamp}.pdf`);
    showNotification('Test cases exported to PDF successfully!');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Smart Filter Functions
function filterByStatus(status) {
    const rows = document.querySelectorAll('#test-cases-body tr');
    const filterBtns = document.querySelectorAll('.filter-btn[onclick*="filterByStatus"]');
    
    // Update active button state
    filterBtns.forEach(btn => {
        if (btn.onclick.toString().includes(`'${status}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply filter
    rows.forEach(row => {
        const statusSelect = row.querySelector('.status-select');
        if (status === 'all' || statusSelect.value === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateFilteredStats();
}

function filterByPriority(priority) {
    const rows = document.querySelectorAll('#test-cases-body tr');
    const filterBtns = document.querySelectorAll('.filter-btn[onclick*="filterByPriority"]');
    
    // Update active button state
    filterBtns.forEach(btn => {
        if (btn.onclick.toString().includes(`'${priority}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply filter - remember to skip checkbox column
    rows.forEach(row => {
        const priorityCell = row.cells[4]; // Changed from 3 to 4 because of checkbox column
        if (priority === 'all' || priorityCell.textContent.toLowerCase() === priority) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateFilteredStats();
}

function searchTestCases() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#test-cases-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateFilteredStats();
}

function updateFilteredStats() {
    const visibleRows = document.querySelectorAll('#test-cases-body tr:not([style*="display: none"])');
    const totalFiltered = visibleRows.length;
    
    // Update a filtered count display if needed
    const filterInfo = document.getElementById('filter-info');
    if (filterInfo) {
        filterInfo.textContent = `Showing ${totalFiltered} of ${generatedTestCases.length} test cases`;
    }
}

// Bulk Operations Functions
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    updateBulkActionButtons();
}

function updateBulkActionButtons() {
    const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
    const bulkActionButtons = document.querySelectorAll('.bulk-btn');
    const selectedCount = document.querySelector('.selected-count');
    
    if (selectedCount) {
        selectedCount.textContent = `${checkedBoxes.length} selected`;
    }
    
    if (checkedBoxes.length > 0) {
        bulkActionButtons.forEach(btn => btn.disabled = false);
    } else {
        bulkActionButtons.forEach(btn => btn.disabled = true);
    }
}

function bulkUpdateStatus(status) {
    const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
    
    checkedBoxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const statusSelect = row.querySelector('.status-select');
        statusSelect.value = status;
        statusSelect.className = `status-select status-${status}`;
    });
    
    updateDashboard();
    showNotification(`Updated ${checkedBoxes.length} test cases to ${status}`);
}

function bulkDelete() {
    const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
    
    if (confirm(`Are you sure you want to delete ${checkedBoxes.length} test cases?`)) {
        checkedBoxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const index = parseInt(row.dataset.index);
            generatedTestCases.splice(index, 1);
            row.remove();
        });
        
        // Re-index remaining rows
        document.querySelectorAll('#test-cases-body tr').forEach((row, idx) => {
            row.dataset.index = idx;
        });
        
        updateDashboard();
        showNotification(`Deleted ${checkedBoxes.length} test cases`);
    }
}

// View Mode Functions
let currentView = 'table';

function setViewMode(mode) {
    currentView = mode;
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update active button
    viewButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    viewButtons.forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes(mode)) {
            btn.classList.add('active');
        }
    });
    
    // Hide all view containers
    const allViews = document.querySelectorAll('.view-container');
    allViews.forEach(view => {
        view.style.display = 'none';
    });
    
    // Show the selected view
    const selectedView = document.getElementById(`${mode}-view`);
    if (selectedView) {
        selectedView.style.display = 'block';
        
        if (mode === 'card') {
            renderCardView();
        }
    }
}

function renderCardView() {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
        console.error('Card container not found');
        return;
    }
    
    cardContainer.innerHTML = '';
    
    // Check if test cases exist
    if (!generatedTestCases || generatedTestCases.length === 0) {
        cardContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: #999;">No test cases generated yet. Generate test cases first.</p>';
        return;
    }
    
    // Get current status from table rows
    const tableRows = document.querySelectorAll('#test-cases-body tr');
    
    generatedTestCases.forEach((tc, index) => {
        // Get current status from table
        let currentStatus = 'pending';
        if (tableRows[index]) {
            const statusSelect = tableRows[index].querySelector('.status-select');
            if (statusSelect) {
                currentStatus = statusSelect.value;
            }
        }
        
        const card = document.createElement('div');
        card.className = 'test-card';
        card.innerHTML = `
            <div class="test-card-header">
                <span class="test-card-id">${tc.id}</span>
                <span class="priority-badge priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
            </div>
            <div class="test-card-body">
                <h4 style="color: #333; margin-bottom: 10px;">${tc.description}</h4>
                <div style="margin: 15px 0;">
                    <strong style="color: #555;">Test Steps:</strong>
                    <pre style="background: #f8f9fa; padding: 10px; border-radius: 8px; margin-top: 5px; white-space: pre-wrap; font-size: 0.9em;">${tc.steps}</pre>
                </div>
                <div style="margin: 15px 0;">
                    <strong style="color: #555;">Expected Results:</strong>
                    <p style="margin-top: 5px; line-height: 1.5;">${tc.expectedResults}</p>
                </div>
            </div>
            <div class="test-card-footer">
                <label style="font-size: 0.9em; color: #666;">Status:</label>
                <select class="status-select status-${currentStatus}" data-index="${index}" onchange="updateStatusFromCard(this, ${index})">
                    <option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="pass" ${currentStatus === 'pass' ? 'selected' : ''}>Pass</option>
                    <option value="fail" ${currentStatus === 'fail' ? 'selected' : ''}>Fail</option>
                </select>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Update status from card view
function updateStatusFromCard(selectElement, index) {
    updateStatus(selectElement);
    
    // Sync with table view
    const tableRows = document.querySelectorAll('#test-cases-body tr');
    if (tableRows[index]) {
        const tableSelect = tableRows[index].querySelector('.status-select');
        if (tableSelect) {
            tableSelect.value = selectElement.value;
            tableSelect.className = selectElement.className;
        }
    }
}


// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize modal-specific content
    if (modalId === 'share-modal') {
        const shareLinkInput = document.getElementById('share-link');
        if (shareLinkInput) {
            shareLinkInput.value = window.location.href;
        }
    } else if (modalId === 'report-modal') {
        // Generate initial summary report
        generateSummaryReport();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}


// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Share Functions
function shareViaEmail() {
    const subject = 'Test Cases Report';
    const body = 'Please find attached the test cases report.';
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyShareLink() {
    const shareUrl = window.location.href;
    const shareLinkInput = document.getElementById('share-link');
    
    if (shareLinkInput) {
        shareLinkInput.value = shareUrl;
    }
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        showNotification('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        if (shareLinkInput) {
            shareLinkInput.select();
            document.execCommand('copy');
            showNotification('Link copied to clipboard!');
        }
    });
}

function shareViaSlack() {
    const text = 'Check out these test cases I generated!';
    const url = window.location.href;
    // Slack doesn't have a direct share URL, so we'll copy to clipboard
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        showNotification('Text copied! Paste it in Slack.');
    });
}

function shareViaTeams() {
    const text = 'Check out these test cases I generated!';
    const url = window.location.href;
    // Teams doesn't have a direct share URL, so we'll copy to clipboard
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        showNotification('Text copied! Paste it in Teams.');
    });
}

// Integration Functions
function connectJira() {
    // Placeholder for JIRA integration
    showNotification('JIRA integration coming soon!');
}

function connectYouTrack() {
    // Placeholder for YouTrack integration
    showNotification('YouTrack integration coming soon!');
}

function setupJiraIntegration() {
    // Show a form to enter JIRA credentials
    showNotification('JIRA integration setup coming soon!');
    closeModal('integration-modal');
}

function setupYouTrackIntegration() {
    // Show a form to enter YouTrack credentials
    showNotification('YouTrack integration setup coming soon!');
    closeModal('integration-modal');
}

function setupGithubIntegration() {
    // Show a form to enter GitHub credentials
    showNotification('GitHub integration setup coming soon!');
    closeModal('integration-modal');
}

// Report Generation
function generateReport(format) {
    if (format === 'summary') {
        generateSummaryReport();
    } else if (format === 'detailed') {
        generateDetailedReport();
    } else if (format === 'executive') {
        generateExecutiveReport();
    }
}

function generateSummaryReport() {
    const reportContent = document.getElementById('report-content');
    const total = parseInt(document.getElementById('total-tests').textContent);
    const passed = parseInt(document.getElementById('passed-tests').textContent);
    const failed = parseInt(document.getElementById('failed-tests').textContent);
    const pending = parseInt(document.getElementById('pending-tests').textContent);
    
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const executionRate = total > 0 ? Math.round(((passed + failed) / total) * 100) : 0;
    
    reportContent.innerHTML = `
        <div class="report-summary">
            <div class="report-header">
                <h3>Test Execution Summary Report</h3>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <p>Test Type: ${document.getElementById('test-type').selectedOptions[0].text}</p>
            </div>
            
            <div class="report-stats">
                <div class="stat-card">
                    <div class="stat-value">${total}</div>
                    <div class="stat-label">Total Test Cases</div>
                </div>
                <div class="stat-card success">
                    <div class="stat-value">${passed}</div>
                    <div class="stat-label">Passed</div>
                </div>
                <div class="stat-card danger">
                    <div class="stat-value">${failed}</div>
                    <div class="stat-label">Failed</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-value">${pending}</div>
                    <div class="stat-label">Pending</div>
                </div>
            </div>
            
            <div class="report-metrics">
                <h4>Key Metrics</h4>
                <div class="metric-item">
                    <span class="metric-label">Pass Rate:</span>
                    <span class="metric-value">${passRate}%</span>
                    <div class="metric-bar">
                        <div class="metric-fill success" style="width: ${passRate}%"></div>
                    </div>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Execution Rate:</span>
                    <span class="metric-value">${executionRate}%</span>
                    <div class="metric-bar">
                        <div class="metric-fill info" style="width: ${executionRate}%"></div>
                    </div>
                </div>
            </div>
            
            ${failed > 0 ? `
            <div class="report-failures">
                <h4>Failed Test Cases</h4>
                <ul>
                    ${getFailedTestCases().map(tc => `
                        <li>
                            <strong>${tc.id}</strong>: ${tc.description}
                            <span class="priority-badge priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;
    
    // Update button states
    updateReportButtons('summary');
}

function generateDetailedReport() {
    const reportContent = document.getElementById('report-content');
    const testCases = getTableData();
    
    reportContent.innerHTML = `
        <div class="report-detailed">
            <div class="report-header">
                <h3>Detailed Test Execution Report</h3>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <p>Total Test Cases: ${testCases.length}</p>
            </div>
            
            <div class="detailed-table">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Test Case ID</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Expected Results</th>
                            <th>Actual Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${testCases.map(tc => `
                            <tr class="status-${tc.Status.toLowerCase()}">
                                <td>${tc['Test Case ID']}</td>
                                <td>${tc['Test Case Description']}</td>
                                <td><span class="priority-badge priority-${tc.Priority.toLowerCase()}">${tc.Priority}</span></td>
                                <td><span class="status-badge status-${tc.Status.toLowerCase()}">${tc.Status}</span></td>
                                <td>${tc['Expected Results']}</td>
                                <td>${tc['Actual Results']}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    updateReportButtons('detailed');
}

function generateExecutiveReport() {
    const reportContent = document.getElementById('report-content');
    const total = parseInt(document.getElementById('total-tests').textContent);
    const passed = parseInt(document.getElementById('passed-tests').textContent);
    const failed = parseInt(document.getElementById('failed-tests').textContent);
    const pending = parseInt(document.getElementById('pending-tests').textContent);
    
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const riskLevel = failed > total * 0.2 ? 'High' : failed > total * 0.1 ? 'Medium' : 'Low';
    const recommendation = passRate >= 90 ? 'Ready for Production' : 
                          passRate >= 70 ? 'Minor Issues to Address' : 
                          'Significant Issues Found';
    
    reportContent.innerHTML = `
        <div class="report-executive">
            <div class="report-header">
                <h3>Executive Summary</h3>
                <p>Test Execution Report - ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="executive-summary">
                <div class="summary-section">
                    <h4>Overall Status</h4>
                    <div class="status-indicator ${passRate >= 90 ? 'success' : passRate >= 70 ? 'warning' : 'danger'}">
                        <i class="fas ${passRate >= 90 ? 'fa-check-circle' : passRate >= 70 ? 'fa-exclamation-circle' : 'fa-times-circle'}"></i>
                        <span>${recommendation}</span>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h4>Quality Metrics</h4>
                    <div class="executive-metrics">
                        <div class="exec-metric">
                            <label>Test Coverage:</label>
                            <span>${total} test cases</span>
                        </div>
                        <div class="exec-metric">
                            <label>Success Rate:</label>
                            <span class="${passRate >= 90 ? 'success' : passRate >= 70 ? 'warning' : 'danger'}">${passRate}%</span>
                        </div>
                        <div class="exec-metric">
                            <label>Risk Level:</label>
                            <span class="risk-${riskLevel.toLowerCase()}">${riskLevel}</span>
                        </div>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h4>Key Findings</h4>
                    <ul class="findings-list">
                        <li>${passed} test cases passed successfully</li>
                        ${failed > 0 ? `<li class="danger">${failed} test cases failed and require attention</li>` : ''}
                        ${pending > 0 ? `<li class="warning">${pending} test cases are pending execution</li>` : ''}
                        ${getHighPriorityFailures().length > 0 ? `<li class="danger">${getHighPriorityFailures().length} high-priority test cases failed</li>` : ''}
                    </ul>
                </div>
                
                <div class="summary-section">
                    <h4>Recommendations</h4>
                    <ul class="recommendations">
                        ${failed > 0 ? '<li>Address failed test cases before proceeding to production</li>' : ''}
                        ${pending > 0 ? '<li>Complete execution of pending test cases</li>' : ''}
                        ${passRate < 90 ? '<li>Improve test coverage and fix identified issues</li>' : ''}
                        ${passRate >= 90 ? '<li>System appears stable and ready for deployment</li>' : ''}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    updateReportButtons('executive');
}

// Helper functions
function getFailedTestCases() {
    const rows = document.querySelectorAll('#test-cases-body tr');
    const failed = [];
    
    rows.forEach(row => {
        const status = row.querySelector('.status-select');
        if (status && status.value === 'fail') {
            // Skip checkbox column (0) and use correct indices
            failed.push({
                id: row.cells[1].textContent.trim(),
                description: row.cells[2].textContent.trim(),
                priority: row.cells[4].textContent.trim()
            });
        }
    });
    
    return failed;
}

function getHighPriorityFailures() {
    return getFailedTestCases().filter(tc => tc.priority.toLowerCase() === 'high');
}

function updateReportButtons(activeType) {
    const buttons = document.querySelectorAll('.report-type-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(activeType)) {
            btn.classList.add('active');
        }
    });
}

// Download and print functions
function downloadReport(format) {
    if (format === 'pdf') {
        exportToPDF();
    } else if (format === 'html') {
        const reportContent = document.getElementById('report-content').innerHTML;
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Test Execution Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .report-header { text-align: center; margin-bottom: 30px; }
                    .report-stats { display: flex; justify-content: space-around; margin: 20px 0; }
                    .stat-card { text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .stat-value { font-size: 2em; font-weight: bold; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                    th { background: #f0f0f0; }
                    .priority-high { color: #e53e3e; }
                    .priority-medium { color: #dd6b20; }
                    .priority-low { color: #38a169; }
                    .status-pass { background: #c6f6d5; }
                    .status-fail { background: #fed7d7; }
                    .status-pending { background: #fefcbf; }
                </style>
            </head>
            <body>
                ${reportContent}
            </body>
            </html>
        `;
        downloadFile(html, 'test_report.html', 'text/html');
    }
}

function printReport() {
    window.print();
}