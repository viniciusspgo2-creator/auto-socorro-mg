import Image from 'next/image'
import {
  IconArrowUpRight,
  IconBoat,
  IconBus,
  IconCar,
  IconPhoneFill,
  IconPickup,
  IconPinFill,
  IconTractor,
  IconTruck,
} from '@/components/site/icons'

/**
 * Seções da home — réplica fiel do index.php original (hero, trust-rail,
 * veículos, estrutura, processo, sobre, benefícios e galeria).
 * Ícones premium preenchidos (set sob medida) no lugar dos traços originais.
 */

const vehicles = [
  { name: 'Carros', Icon: IconCar },
  { name: 'Caminhonetes', Icon: IconPickup },
  { name: 'Caminhões', Icon: IconTruck },
  { name: 'Ônibus', Icon: IconBus },
  { name: 'Máquinas agrícolas', Icon: IconTractor },
  { name: 'Lanchas', Icon: IconBoat },
]

const galleryPhotos = [
  'maquina-1',
  'frota-aerea',
  'frota-frente',
  'operacao-rodovia',
  'socorro-pesado',
  'plataforma',
  'reboque-caminhao',
]

export function HomeSections({ whatsappHref }: { whatsappHref: string }) {
  return (
    <>
      <section className="hero">
        <div className="hero-photo">
          <Image
            src="/img/frota.webp"
            alt="Frota do Auto Socorro MG"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 920px) 100vw, 64vw"
          />
        </div>
        <div className="road-grid" aria-hidden="true"></div>
        <div className="container hero-content reveal">
          <h1>
            Reboque confiável para carros e veículos pesados,{' '}
            <em>24h por dia.</em>
          </h1>
          <p>
            Atendimento especializado para carros, caminhonetes, caminhões, ônibus,
            máquinas agrícolas, lanchas e outros veículos pesados.
          </p>
          <div className="location">
            <IconPinFill />
            Santa Fé do Sul e região
          </div>
          <div className="actions">
            <a className="btn btn-primary" href={whatsappHref} target="_blank" rel="noopener">
              Chamar no WhatsApp <IconArrowUpRight />
            </a>
            <a className="btn btn-ghost" href="tel:+5517996371352">
              Ligar (17) 99637-1352
            </a>
          </div>
        </div>
      </section>

      <section className="trust-rail" aria-label="Diferenciais">
        <div className="container">
          <div>
            <span>01</span>
            <strong>Preço justo</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Segurança</strong>
          </div>
          <div>
            <span>03</span>
            <strong>24 horas por dia</strong>
          </div>
        </div>
      </section>

      <section className="vehicle-section section" id="servicos">
        <div className="container">
          <div className="section-heading reveal">
            <p>O que transportamos</p>
            <h2>Do carro à máquina pesada, temos estrutura para transportar.</h2>
            <span>
              Atendimento para diferentes necessidades, com o equipamento adequado ao
              tipo de veículo.
            </span>
          </div>
          <div className="vehicle-rail">
            {vehicles.map(({ name, Icon }) => (
              <article className="reveal" key={name}>
                <Icon />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="equipment section" id="estrutura">
        <div className="container">
          <div className="equipment-title reveal">
            <div>
              <p>Estrutura</p>
              <h2>Equipamento para grandes desafios.</h2>
            </div>
          </div>
          <div className="equipment-grid">
            <article className="equipment-card reveal">
              <figure>
                <Image
                  src="/img/escavadeira.webp"
                  alt="Escavadeira transportada na plataforma do Auto Socorro MG"
                  fill
                  loading="lazy"
                  sizes="(max-width: 920px) 100vw, 55vw"
                />
              </figure>
              <div>
                <span>01</span>
                <h3>Plataforma hidráulica de 11 metros</h3>
                <p>
                  Estrutura para o transporte seguro e eficiente de veículos leves e
                  pesados, incluindo caminhões, ônibus, máquinas agrícolas e lanchas.
                </p>
              </div>
            </article>
            <article className="equipment-card reverse reveal">
              <figure>
                <Image
                  src="/img/guincho-vermelho.webp"
                  alt="Guincho pesado vermelho do Auto Socorro MG"
                  fill
                  loading="lazy"
                  sizes="(max-width: 920px) 100vw, 55vw"
                />
              </figure>
              <div>
                <span>02</span>
                <h3>Guincho lança pesada</h3>
                <p>
                  Equipamento dedicado à remoção e movimentação de veículos pesados, com
                  equipe preparada para conduzir a operação.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="process section">
        <div className="container">
          <div className="process-heading reveal">
            <p>Atendimento direto</p>
            <h2>
              Ligou, <em>chegou.</em>
            </h2>
          </div>
          <div className="steps">
            <article className="reveal">
              <b>1</b>
              <h3>Conte o que aconteceu</h3>
              <p>Fale pelo telefone ou WhatsApp e informe sua necessidade.</p>
            </article>
            <article className="reveal">
              <b>2</b>
              <h3>Envie sua localização</h3>
              <p>Compartilhe onde está e qual veículo precisa de atendimento.</p>
            </article>
            <article className="reveal">
              <b>3</b>
              <h3>A equipe orienta você</h3>
              <p>Confirmamos os detalhes para realizar o atendimento adequado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about section" id="sobre">
        <div className="container about-grid">
          <div className="about-copy reveal">
            <p>Auto Socorro 24h</p>
            <h2>Nós vamos até você.</h2>
            <p>
              O Auto Socorro MG atende 24 horas por dia, todos os dias da semana, em
              Santa Fé do Sul e região.
            </p>
            <p>
              Nossa equipe é formada por profissionais experientes e treinados para
              oferecer um serviço seguro, eficiente e cuidadoso.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={whatsappHref} target="_blank" rel="noopener">
                Solicitar atendimento <IconArrowUpRight />
              </a>
              <a className="phone-link" href="tel:+5517996371352">
                <IconPhoneFill />
                (17) 99637-1352
              </a>
            </div>
          </div>
          <div className="operator reveal">
            <div className="operator-halo"></div>
            <Image
              src="/img/atendente.webp"
              alt="Atendente do Auto Socorro MG com telefone"
              width={708}
              height={708}
              loading="lazy"
              sizes="(max-width: 920px) 60vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container benefits-grid">
          <article className="reveal">
            <span>01</span>
            <h3>Melhor custo-benefício</h3>
            <p>Serviços de reboque com uma relação equilibrada entre custo, qualidade e segurança.</p>
          </article>
          <article className="reveal">
            <span>02</span>
            <h3>Profissionais qualificados</h3>
            <p>Equipe experiente e treinada para atender diferentes necessidades de reboque.</p>
          </article>
          <article className="reveal">
            <span>03</span>
            <h3>Pagamento flexível</h3>
            <p>Pagamento em dinheiro, Pix e cartões de crédito ou débito.</p>
          </article>
        </div>
      </section>

      <section className="gallery" aria-label="Galeria de atendimentos">
        <div className="gallery-track">
          {galleryPhotos.map((photo) => (
            <button
              key={photo}
              className="gallery-item"
              data-image={`/img/${photo}.webp`}
              aria-label="Ampliar foto do atendimento"
            >
              <Image
                src={`/img/${photo}.webp`}
                alt="Atendimento e transporte realizado pelo Auto Socorro MG"
                fill
                loading="lazy"
                sizes="280px"
              />
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
