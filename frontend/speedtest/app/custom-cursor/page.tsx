'use client'

import { useEffect, useRef, useState } from "react"

export default function Page(){
    const cursorRef = useRef<HTMLDivElement | null>(null)
    const [size, setSize] = useState({w: 24, h: 24})
    useEffect(()=>{
        const custom = cursorRef?.current!
        window.addEventListener("mousemove", (e)=>{

            custom.style.left = `${e.clientX}px`
            custom.style.top = `${e.clientY}px`

        })
    }, [])

    useEffect(() => {
        const custom = cursorRef.current!;

        const down = () => {
            custom.style.transform = "translate(-50%, -50%) scale(1.8)";
        };

        const up = () => {
            custom.style.transform = "translate(-50%, -50%) scale(1)";
        };

        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);

        return () => {
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);

    return(
        <div className="w-screen min-h-screen bg-black text-white flex justify-center items-center relative cursor-none">
            <div className="w-6 h-6 rounded-full bg-white absolute top-0 left-0 -translate-1/2 pointer-events-none mix-blend-difference cursor-none transition-transform" ref={cursorRef}></div>
            <div className="w-full h-full p-25">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem commodi accusamus ex saepe ipsam. Voluptatem, perferendis aperiam possimus sit fuga qui placeat quas dolorum, aspernatur rerum non facilis harum earum nostrum illum! Modi neque enim possimus inventore, blanditiis saepe eveniet, sint, in iure architecto sit ex illum tempora labore. Aperiam, sed. Deserunt provident omnis rerum, velit veritatis hic cupiditate dolorem. Eos veritatis quibusdam asperiores sapiente deserunt mollitia suscipit pariatur soluta quasi reprehenderit? Nam molestias ea ex recusandae exercitationem architecto asperiores voluptatum quia veniam facere numquam velit eveniet, qui earum quibusdam in fugiat quidem vero quam. Neque nostrum accusantium, consequuntur enim autem temporibus voluptatum magnam unde fugiat molestias modi officiis velit voluptates voluptatem officia beatae. Reiciendis esse enim cupiditate officia. Voluptates labore vitae ex repudiandae nulla nihil odit alias tempora at pariatur neque optio quos aspernatur dolorem voluptas totam sunt ipsam quisquam, perferendis quam, soluta ea. Incidunt, perspiciatis ipsam ducimus voluptatum nobis, minus sapiente omnis velit odit odio itaque libero blanditiis dolores id nemo officiis optio dolorem quam unde error fugit? Nemo quo excepturi laborum corrupti placeat rerum animi porro, omnis fugit exercitationem autem laboriosam iure perspiciatis officia quam amet vitae quas labore. Facilis velit, optio porro autem tenetur laudantium nam iste facere sequi nobis reiciendis minima nesciunt? Numquam tempore eum voluptas, eligendi dolores maiores, odio repellendus beatae odit optio officiis possimus ducimus nihil hic maxime error. Voluptas vero, nam nemo obcaecati eaque sint delectus sed! Praesentium et illo enim vero sit laboriosam! Ex, tempora? Repudiandae reiciendis facilis molestias illo error nobis praesentium quisquam eum quo perspiciatis sunt officia magni, explicabo cumque quis, assumenda doloremque vero et in dolorum. Doloremque asperiores ut similique tempora, molestiae minus nostrum. Dicta hic rerum saepe repudiandae. Ipsum sequi esse atque placeat qui. Aliquid, a minima. Sint aliquam eius officiis aliquid aspernatur, illum, tempora in corrupti doloremque quas atque, eos nam quo ullam ipsum. Tempora natus ipsa officia adipisci voluptatum, deleniti asperiores nam dolor in soluta hic magnam sunt quasi repudiandae aliquid quam ducimus ut maxime labore. Commodi laboriosam officiis provident? Consectetur, reiciendis enim exercitationem ipsum obcaecati porro vitae tempora necessitatibus atque, quidem iusto ex odit itaque. Sunt quas reprehenderit maxime repellat aliquam, saepe ipsa voluptate voluptates nemo! Iure eaque velit debitis repudiandae quos possimus ratione deserunt blanditiis, eligendi atque excepturi, accusantium pariatur, quod vel corrupti consequatur nihil! Minus ducimus quaerat eligendi ab excepturi magni quibusdam, ratione maiores magnam earum placeat quas tempore. Nesciunt reprehenderit similique, possimus beatae, a at, minima repellat incidunt labore ipsam molestias deleniti. Iste tempore culpa itaque hic blanditiis porro aliquid temporibus eos corporis nostrum consequatur optio aliquam illum voluptas soluta exercitationem, aut ut quia necessitatibus dolorum reiciendis mollitia molestias minima vero. Delectus maiores ratione aut cum aliquid iure dolore commodi eveniet blanditiis modi tenetur officia esse doloribus quia maxime minima unde, exercitationem illo tempora, earum, quam id neque hic! Saepe, eos id fugit molestias, iusto at et autem exercitationem molestiae eius in optio voluptatibus pariatur quaerat ex corporis dolores, aliquam repudiandae. Sit repellendus enim amet saepe mollitia ullam omnis impedit, dolor, consectetur tenetur natus pariatur nulla totam. Architecto, modi nam commodi numquam eius veritatis facere. Beatae, minima impedit. Perspiciatis porro suscipit harum. Nisi distinctio natus odit ipsa corporis, fugiat ratione expedita ut exercitationem cumque voluptates alias tempore, nobis rem asperiores nam esse cupiditate obcaecati ullam sequi harum. Voluptatem facere veritatis dolores ullam molestias temporibus minima corrupti deleniti sapiente ex pariatur eveniet, culpa impedit architecto dolorum corporis enim voluptas illo vero porro. Debitis quaerat quam vel accusamus, odio minima aut consectetur, tenetur, quidem nihil numquam. Eaque, dolor! Eos beatae architecto dicta fuga amet expedita atque, dolorum corporis ipsa. Expedita ipsam porro, ipsum similique itaque, quas rem a quibusdam non in adipisci illo omnis doloribus dignissimos enim ducimus. Consequuntur, delectus! Voluptatibus mollitia debitis odio quod odit velit expedita, nesciunt perferendis tempora nulla perspiciatis soluta quasi facilis dolor deleniti, placeat provident repudiandae veniam. Facere corrupti rerum, rem aperiam optio impedit, ex, accusantium sed voluptatum possimus dolorum quidem porro molestiae repudiandae? Ipsum earum ratione numquam exercitationem debitis animi maxime autem aspernatur. Eum eaque sed aspernatur a molestiae rem quidem explicabo voluptatem nulla ad magni cum, consequatur quibusdam, corrupti laudantium distinctio officia vitae perspiciatis accusamus facere neque tenetur autem. Similique, autem magni molestias possimus minus natus, nam esse quibusdam accusantium eum et, id aperiam nemo earum nesciunt voluptatibus odit sint placeat praesentium ipsum commodi a sunt architecto nobis. Rerum, ipsa magni nulla labore, recusandae ad ipsam quam amet, vero odit iusto? Cumque quibusdam libero, aspernatur accusantium debitis adipisci consequatur doloribus quo et laborum eveniet. Officiis iste rem totam distinctio excepturi cum corporis, quisquam tempora impedit temporibus. Voluptatum itaque at dolorem numquam reprehenderit illo quis, sunt mollitia nobis quidem rerum omnis. Eos rerum, voluptas libero tempora, quasi facilis pariatur veniam repellendus laboriosam assumenda enim ipsam dolorum nam. Delectus earum nihil, dignissimos commodi voluptate molestias minus! Perspiciatis minima magni deleniti repellat, quam rem praesentium qui unde maxime exercitationem debitis reiciendis voluptas voluptatem cupiditate recusandae ea culpa iure illo dignissimos velit amet non? Laudantium minima corrupti nulla, beatae asperiores vel fuga ipsam debitis sed iusto tenetur, culpa non vitae doloribus, placeat corporis sequi suscipit molestias alias tempore a odio dolore. Laboriosam tempore velit impedit sunt dolores debitis earum odit dolorem minima. Repellendus suscipit ipsa dolorem quos nemo nostrum? Voluptatum temporibus magni, facere dolorum id distinctio doloremque impedit dolores ab numquam repellendus necessitatibus cum consequatur libero doloribus! Quas maiores doloribus molestias quis assumenda, excepturi corporis veritatis provident dolore est laboriosam illum cum aliquam veniam illo quo esse quasi repudiandae blanditiis, earum incidunt. Eius a rem dolorum! Ad officiis distinctio libero, ipsa vero neque fuga nulla dicta cum aliquam eligendi et voluptatum aperiam natus! Praesentium voluptatum exercitationem ullam labore qui, cum ex eligendi quasi explicabo blanditiis eos aut ad consequuntur a error itaque ducimus porro nobis pariatur accusamus omnis? Nam minus excepturi harum perspiciatis dolorem iure velit cumque ex rem, deserunt eveniet, maxime, quisquam corporis. Sequi, quasi? Magni veritatis fugit eum blanditiis aut, ullam iure natus ex! Laudantium quas illum suscipit sequi quaerat dicta nihil animi, maxime tenetur nulla officia porro!
            </div>
        </div>
    )
}