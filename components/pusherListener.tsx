// import React, { useEffect, useState } from 'react';
// import Pusher from 'pusher-js';

// interface Update {
//   orderId: string;
//   status: string;
// }

// const PusherListener: React.FC = () => {
//   const [updates, setUpdates] = useState<Update[]>([]);

//   useEffect(() => {
//     const pusher = new Pusher('1ebefc9f9bc59e78ec37', {
//     cluster: 'ap2',
//     forceTLS: true,
//     });

//     const channel = pusher.subscribe('order-updates');

//     channel.bind('newOrder', (data: Update) => {
//       setUpdates((prev) => [...prev, data]);
//     });

//     return () => {
//       pusher.unsubscribe('order-updates');
//       pusher.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h3>Order Updates</h3>
//       <ul>
//         {updates.map((update, index) => (
//           <li key={index}>
//             New Order Added,
//             Order #{update.orderId} status: {update.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PusherListener;
