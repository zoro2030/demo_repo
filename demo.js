var allowedDomains = ['localhost'];
var currentDomain = window.location.hostname;

if (allowedDomains.indexOf(currentDomain) === -1) {
        console.log('Unauthorized domain:', currentDomain);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/domain_cheacker/detector.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log('Request status:', xhr.status);
                console.log('Response:', xhr.responseText);
            }
        };
        xhr.send('domain=' + encodeURIComponent(currentDomain));
} else {

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        ctx.beginPath();

        var gradient = ctx.createLinearGradient(200, 0, 200, 600);
          gradient.addColorStop(0, '#C7C8CC');     
          gradient.addColorStop(0.25, '#B4B4B8');    
          gradient.addColorStop(0.5, '#7D7C7C');   
          gradient.addColorStop(1, '#454545');

        const pointA = { x: 200, y: 30}; 
        let pointB = { x: 200, y: 550 }; 
        const coils = 80;
        const amplitude = 40;
        let draggingPoint = null;

        

        function drawSpring(pointA, pointB, coils, amplitude) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
          ctx.beginPath();
          ctx.moveTo(pointA.x, pointA.y);

          const smooth_transaction_x = (pointB.x - pointA.x) / coils;
          const smooth_transaction_y = (pointB.y - pointA.y) / coils;
          
          const spacing = 0;
          const angleStep = 0.01;
          const radius = 30;

          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'; 
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 5; 
          ctx.shadowOffsetY = 5;

          for (let i = 0; i <= coils; i += angleStep) {
              const angle = i * Math.PI * 2 / coils;
              const x = pointA.x + (radius + spacing * i / (2 * Math.PI)) * Math.cos(i) + i * smooth_transaction_x;
              const y = pointA.y + Math.sin(i) + i * smooth_transaction_y;
              ctx.lineTo(x, y);
          }

          ctx.lineTo(pointB.x, pointB.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 5;
          ctx.stroke();

          ctx.shadowColor = 'transparent';

          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.arc(pointA.x, pointA.y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'blue';
          ctx.beginPath();
          ctx.arc(pointB.x, pointB.y, 7, 0, Math.PI * 2);
          ctx.fill();
        }


        canvas.addEventListener('mousedown', (e) => {
            handleStart(e);
        });

        canvas.addEventListener('mousemove', (e) => {
            handleMove(e);
        });

        canvas.addEventListener('mouseup', () => {
            handleEnd();
        });

        canvas.addEventListener('mouseleave', () => {
            handleEnd();
        });

        canvas.addEventListener('touchstart', (e) => {
            handleStart(e.touches[0]);
        });

        canvas.addEventListener('touchmove', (e) => {
            handleMove(e.touches[0]);
        });

        canvas.addEventListener('touchend', () => {
            handleEnd();
        });

        canvas.addEventListener('touchcancel', () => {
            handleEnd();
        });

        console.log('Authorized domain:', currentDomain);
        function handleStart(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            console.log(mouseX + " " + mouseY);

            if (Math.pow(mouseX - pointB.x, 2) + Math.pow(mouseY - pointB.y, 2) <= 100) { 
                draggingPoint = pointB;
            }
        }

        function handleMove(e) {
            if (draggingPoint) {
                const rect = canvas.getBoundingClientRect();
                draggingPoint.x = e.clientX - rect.left;
                draggingPoint.y = e.clientY - rect.top;
                drawSpring(pointA, pointB, coils, amplitude);
            }
        }

        function handleEnd() {
            draggingPoint = null;
        }

        drawSpring(pointA, pointB, coils, amplitude);
}   